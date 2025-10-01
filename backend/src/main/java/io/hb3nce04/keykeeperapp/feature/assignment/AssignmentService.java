package io.hb3nce04.keykeeperapp.feature.assignment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request.AssignmentRequestDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.response.AssignmentResponseDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request.CreateAssignmentRequestDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request.PatchAssignmentRequestDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.entity.Assignment;
import io.hb3nce04.keykeeperapp.feature.key.KeyService;
import io.hb3nce04.keykeeperapp.feature.applicant.ApplicantService;
import io.hb3nce04.keykeeperapp.feature.user.service.UserService;
import io.hb3nce04.keykeeperapp.common.exception.BusinessLogicException;
import io.hb3nce04.keykeeperapp.feature.key.model.entity.Key;
import io.hb3nce04.keykeeperapp.feature.applicant.model.entity.Applicant;
import io.hb3nce04.keykeeperapp.feature.key.model.enums.KeyStatus;
import io.hb3nce04.keykeeperapp.feature.key.KeyRepository;
import io.hb3nce04.keykeeperapp.common.service.AbstractCrudService;

@Service
public class AssignmentService extends AbstractCrudService<Assignment, AssignmentRequestDto, AssignmentResponseDto, AssignmentRepository, AssignmentMapper> {
    private final KeyService keyService;
    private final ApplicantService applicantService;
    private final UserService userService;
    private final KeyRepository keyRepository;

    public AssignmentService(
            AssignmentRepository repository,
            AssignmentMapper mapper,
            KeyService keyService,
            ApplicantService applicantService,
            UserService userService,
            KeyRepository keyRepository) {
        super(repository, mapper);
        this.keyService = keyService;
        this.applicantService = applicantService;
        this.userService = userService;
        this.keyRepository = keyRepository;
    }

    @Override
    public List<AssignmentResponseDto> findAll() {
        List<Assignment> result;
        if (super.isCurrentUserAdmin()) {
            result = repository.findAll();
        } else {
            result = repository.findAllByUser_Id(super.getCurrentUserId());
        }
        return mapper.toDtoList(result);
    }

    @Override
    public AssignmentResponseDto create(AssignmentRequestDto dto) {
        validateAssignmentDate(dto.getDate());
        validateAssignmentTime(dto.getStartTime(), Optional.ofNullable(dto.getEndTime()));

        Assignment entity = mapper.toEntity(dto);

        entity.setUser(userService.findEntityByIdOrThrow(super.getCurrentUserId()));

        Key key = keyService.findEntityByIdOrThrow(dto.getKeyId());
        validateAssignmentKeyStatus(key.getStatus());
        if (dto.getEndTime() != null) {
            key.setStatus(KeyStatus.AVAILABLE);
        } else {
            key.setStatus(KeyStatus.CHECKED_OUT);
        }
        entity.setKey(key);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    @Override
    public AssignmentResponseDto update(Long id, AssignmentRequestDto dto) {
        validateAssignmentDate(dto.getDate());
        validateAssignmentTime(dto.getStartTime(), Optional.ofNullable(dto.getEndTime()));

        Assignment entity = findEntityByIdOrThrow(id);

        Applicant applicant = applicantService.findEntityByIdOrThrow(dto.getApplicantId());
        entity.setApplicant(applicant);

        Key key = keyService.findEntityByIdOrThrow(dto.getKeyId());
        if (key.getStatus().equals(KeyStatus.LOST) || key.getStatus().equals((KeyStatus.DAMAGED))) {
            throw new BusinessLogicException("A kulcs törött vagy eltűnt!");
        }
        mapper.updateEntity(dto, entity);
        key.setStatus(dto.getEndTime() != null ? KeyStatus.AVAILABLE : KeyStatus.CHECKED_OUT);
        entity.setKey(key);
        keyRepository.save(key);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public AssignmentResponseDto register(CreateAssignmentRequestDto dto) {
        Key key = keyService.findEntityByIdOrThrow(dto.getKeyId());
        validateAssignmentKeyStatus(key.getStatus());
        key.setStatus(KeyStatus.CHECKED_OUT);

        Assignment entity = new Assignment();

        entity.setKey(key);
        entity.setApplicant(applicantService.findEntityByIdOrThrow(dto.getApplicantId()));
        entity.setDate(LocalDate.now());
        entity.setStartTime(LocalTime.now());
        entity.setUser(userService.findEntityByIdOrThrow(super.getCurrentUserId()));

        keyRepository.save(key);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    private void validateAssignmentDate(LocalDate date) {
        if (date.isAfter(LocalDate.now().plusDays(1))) {
            throw new BusinessLogicException("Nem lehetséges igénylést leadni ennyire a jövőre vonatkozóan!");
        }
    }

    private void validateAssignmentTime(LocalTime startTime, Optional<LocalTime> endTime) {
        if (endTime.isPresent() && startTime.equals(endTime.get())) {
            throw new BusinessLogicException("Az igénylés és a visszavétel nem lehet egyidőben!");
        }
        if (endTime.isPresent() && !endTime.get().isAfter(startTime)) {
            throw new BusinessLogicException("A visszavétel ideje nem lehet hamarabb, mint a kezdete!");
        }
    }

    private void validateAssignmentKeyStatus(KeyStatus keyStatus) {
        if (!keyStatus.equals(KeyStatus.AVAILABLE)) {
            throw new BusinessLogicException("A kulcs jelenleg nem elérhető!");
        }
    }

    public KeyStatus returnBack(PatchAssignmentRequestDto dto) {
        Assignment entity = findEntityByIdOrThrow(dto.getAssignmentId());
        Key key = entity.getKey();

        KeyStatus status = keyService.changeStatusToReturned(key);

        entity.setEndTime(LocalTime.now());
        repository.save(entity);

        return status;
    }
}

package io.hb3nce04.keykeeperapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.exception.BusinessLogicException;
import io.hb3nce04.keykeeperapp.mapper.BorrowingMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.BorrowingRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.request.CreateBorrowingRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.request.ReturnBorrowingRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.BorrowingResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.model.entity.Requester;
import io.hb3nce04.keykeeperapp.model.enums.KeyStatus;
import io.hb3nce04.keykeeperapp.repository.BorrowingRepository;
import io.hb3nce04.keykeeperapp.repository.KeyRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class BorrowingService extends AbstractCrudService<Borrowing, BorrowingRequestDto, BorrowingResponseDto, BorrowingRepository, BorrowingMapper> {
    private final KeyService keyService;
    private final RequesterService requesterService;
    private final UserService userService;
    private final KeyRepository keyRepository;

    public BorrowingService(
            BorrowingRepository repository,
            BorrowingMapper mapper,
            KeyService keyService,
            RequesterService requesterService,
            UserService userService,
            KeyRepository keyRepository) {
        super(repository, mapper);
        this.keyService = keyService;
        this.requesterService = requesterService;
        this.userService = userService;
        this.keyRepository = keyRepository;
    }

    @Override
    public List<BorrowingResponseDto> findAll() {
        List<Borrowing> result;
        if (super.isCurrentUserAdmin()) {
            result = repository.findAll();
        } else {
            result = repository.findAllByUser_Id(super.getCurrentUserId());
        }
        return mapper.toDtoList(result);
    }

    @Override
    public BorrowingResponseDto create(BorrowingRequestDto dto) {
        validateBorrowingDate(dto.getDate());
        validateBorrowingTime(dto.getStartTime(), Optional.ofNullable(dto.getEndTime()));

        Borrowing entity = mapper.toEntity(dto);

        entity.setUser(userService.findEntityByIdOrThrow(super.getCurrentUserId()));

        Key key = keyService.findEntityByIdOrThrow(dto.getKeyId());
        validateBorrowingKeyStatus(key.getStatus());
        if (dto.getEndTime() != null) {
            key.setStatus(KeyStatus.RETURNED);
        } else {
            key.setStatus(KeyStatus.BORROWED);
        }
        entity.setKey(key);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    @Override
    public BorrowingResponseDto update(Long id, BorrowingRequestDto dto) {
        validateBorrowingDate(dto.getDate());
        validateBorrowingTime(dto.getStartTime(), Optional.ofNullable(dto.getEndTime()));

        Borrowing entity = findEntityByIdOrThrow(id);

        Requester requester = requesterService.findEntityByIdOrThrow(dto.getRequesterId());
        entity.setRequester(requester);

        Key key = keyService.findEntityByIdOrThrow(dto.getKeyId());
        if (key.getStatus().equals(KeyStatus.LOST) || key.getStatus().equals((KeyStatus.BROKEN))) {
            throw new BusinessLogicException("A kulcs törött vagy eltűnt!");
        }
        mapper.updateEntity(dto, entity);
        key.setStatus(dto.getEndTime() != null ? KeyStatus.RETURNED : KeyStatus.BORROWED);
        entity.setKey(key);
        keyRepository.save(key);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public BorrowingResponseDto register(CreateBorrowingRequestDto dto) {
        Key key = keyService.findEntityByIdOrThrow(dto.getKeyId());
        validateBorrowingKeyStatus(key.getStatus());
        key.setStatus(KeyStatus.BORROWED);

        Borrowing entity = new Borrowing();

        entity.setKey(key);
        entity.setRequester(requesterService.findEntityByIdOrThrow(dto.getRequesterId()));
        entity.setDate(LocalDate.now());
        entity.setStartTime(LocalTime.now());
        entity.setUser(userService.findEntityByIdOrThrow(super.getCurrentUserId()));

        keyRepository.save(key);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    private void validateBorrowingDate(LocalDate date) {
        if (date.isAfter(LocalDate.now().plusDays(1))) {
            throw new BusinessLogicException("Nem lehetséges igénylést leadni ennyire a jövőre vonatkozóan!");
        }
    }

    private void validateBorrowingTime(LocalTime startTime, Optional<LocalTime> endTime) {
        if (endTime.isPresent() && startTime.equals(endTime.get())) {
            throw new BusinessLogicException("Az igénylés és a visszavétel nem lehet egyidőben!");
        }
        if (endTime.isPresent() && !endTime.get().isAfter(startTime)) {
            throw new BusinessLogicException("A visszavétel ideje nem lehet hamarabb, mint a kezdete!");
        }
    }

    private void validateBorrowingKeyStatus(KeyStatus keyStatus) {
        if (!keyStatus.equals(KeyStatus.RETURNED)) {
            throw new BusinessLogicException("A kulcs jelenleg nem elérhető!");
        }
    }

    public KeyStatus returnBack(ReturnBorrowingRequestDto dto) {
        Borrowing entity = findEntityByIdOrThrow(dto.getBorrowingId());
        Key key = entity.getKey();

        KeyStatus status = keyService.changeStatusToReturned(key);

        entity.setEndTime(LocalTime.now());
        repository.save(entity);

        return status;
    }
}

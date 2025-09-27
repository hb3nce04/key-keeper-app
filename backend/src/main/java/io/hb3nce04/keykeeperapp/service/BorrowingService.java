package io.hb3nce04.keykeeperapp.service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.exception.BusinessLogicException;
import io.hb3nce04.keykeeperapp.mapper.BorrowingMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.BorrowingRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.BorrowingResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.model.entity.Requester;
import io.hb3nce04.keykeeperapp.repository.BorrowingRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class BorrowingService extends AbstractCrudService<Borrowing, BorrowingRequestDto, BorrowingResponseDto, BorrowingRepository, BorrowingMapper> {
    private final KeyService keyService;
    private final RequesterService requesterService;
    private final UserService userService;

    public BorrowingService(
            BorrowingRepository repository,
            BorrowingMapper mapper,
            KeyService keyService,
            RequesterService requesterService,
            UserService userService
            ) {
        super(repository, mapper);
        this.keyService = keyService;
        this.requesterService = requesterService;
        this.userService = userService;
    }

    @Override
    public List<BorrowingResponseDto> findAll() {
        List<Borrowing> result;
        if (userService.isCurrentUserAdmin()) {
            result = repository.findAll();
        } else {
            result = repository.findAllByUser_Id(userService.getCurrentUserId());
        }
        return mapper.toDtoList(result);
    }

    @Override
    public BorrowingResponseDto create(BorrowingRequestDto dto) {
        validateBorrowingTime(dto.getStartTime(), Optional.ofNullable(dto.getEndTime()));
        Borrowing entity = mapper.toEntity(dto);
        entity.setUser(userService.findEntityByIdOrThrow(userService.getCurrentUserId()));
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public BorrowingResponseDto update(Long id, BorrowingRequestDto dto) {
        validateBorrowingTime(dto.getStartTime(), Optional.ofNullable(dto.getEndTime()));
        Key key = keyService.findEntityByIdOrThrow(dto.getKeyId());
        Requester requester = requesterService.findEntityByIdOrThrow(dto.getRequesterId());
        Borrowing entity = findEntityByIdOrThrow(id);
        mapper.updateEntity(dto, entity);
        entity.setKey(key);
        entity.setRequester(requester);
        return mapper.toDto(repository.save(entity));
    }

    public Optional<BorrowingResponseDto> findByKeyCode(String code) {
        if (this.keyService.findByCode(code).isEmpty()) {
            throw new BusinessLogicException("Ilyen kulcs nem létezik!");
        }
        return Optional.ofNullable(mapper.toDto(repository.findLatestByKeyCode(code)));
    }

    public void validateBorrowingTime(LocalTime startTime, Optional<LocalTime> endTime) {
        if (endTime.isPresent() && !endTime.get().isAfter(startTime)) {
            throw new BusinessLogicException("A visszavétel ideje nem lehet hamarabb, mint a kezdete!");
        }
    }
}

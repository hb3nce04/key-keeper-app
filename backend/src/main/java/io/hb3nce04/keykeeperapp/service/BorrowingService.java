package io.hb3nce04.keykeeperapp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.exception.BusinessLogicException;
import io.hb3nce04.keykeeperapp.mapper.BorrowingMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.BorrowingRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.BorrowingResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.repository.BorrowingRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class BorrowingService extends AbstractCrudService<Borrowing, BorrowingRequestDto, BorrowingResponseDto, BorrowingRepository, BorrowingMapper> {
    private final KeyService keyService;

    public BorrowingService(
            BorrowingRepository repository,
            BorrowingMapper mapper,
            KeyService keyService) {
        super(repository, mapper);
        this.keyService = keyService;
    }

    public Optional<BorrowingResponseDto> findByKeyCode(String code) {
        if (this.keyService.findByCode(code).isEmpty()) {
            throw new BusinessLogicException("Ilyen kulcs nem létezik!");
        }
        return Optional.ofNullable(mapper.toDto(repository.findLatestByKeyCode(code)));
    }
}

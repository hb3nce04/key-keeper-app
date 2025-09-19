package io.hb3nce04.keykeeperapp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.BorrowingMapper;
import io.hb3nce04.keykeeperapp.model.dto.BorrowingDto;
import io.hb3nce04.keykeeperapp.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.repository.BorrowingRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class BorrowingService extends AbstractCrudService<Borrowing, BorrowingDto, BorrowingRepository, BorrowingMapper> {
    public BorrowingService(
            BorrowingRepository repository,
            BorrowingMapper mapper) {
        super(repository, mapper);
    }

    public Optional<BorrowingDto> findByCode(String code) {
        return Optional.ofNullable(mapper.toDto(repository.findByKeyCode(code)));
    }
}

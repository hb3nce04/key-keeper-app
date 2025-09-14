package io.hb3nce04.keykeeperapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.BorrowingMapper;
import io.hb3nce04.keykeeperapp.model.dto.BorrowingDto;
import io.hb3nce04.keykeeperapp.repository.BorrowingRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BorrowingService {
    private final BorrowingMapper mapper;
    private final BorrowingRepository borrowingRepository;

    public List<BorrowingDto> findAllByUserId(Long userId) {
        return this.mapper.toDtoList(borrowingRepository.findAllByUserId(userId));
    }
}

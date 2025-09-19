package io.hb3nce04.keykeeperapp.repository;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;

@Repository
public interface BorrowingRepository extends BaseRepository<Borrowing> {
    // TODO: List<Borrowing> findAllByUserId(Long userId);

    Borrowing findByKeyCode(String keyCode);
}

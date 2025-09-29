package io.hb3nce04.keykeeperapp.feature.borrowing;

import java.util.List;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.common.repository.BaseRepository;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.entity.Borrowing;

@Repository
public interface BorrowingRepository extends BaseRepository<Borrowing> {
    List<Borrowing> findAllByUser_Id(Long userId);
}

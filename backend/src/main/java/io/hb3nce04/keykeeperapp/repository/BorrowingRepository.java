package io.hb3nce04.keykeeperapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;

@Repository
public interface BorrowingRepository extends BaseRepository<Borrowing> {
    @Query("""
               SELECT b
               FROM Borrowing b
               WHERE b.key.code = :code
                 AND b.status IN ('BORROWED', 'RETURNED')
               ORDER BY b.date DESC, b.startTime DESC
            """)
    Borrowing findLatestByKeyCode(String code);

    List<Borrowing> findAllByUser_Id(Long userId);
}

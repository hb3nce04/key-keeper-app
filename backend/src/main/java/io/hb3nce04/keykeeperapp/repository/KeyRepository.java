package io.hb3nce04.keykeeperapp.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.model.enums.KeyStatus;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;

@Repository
public interface KeyRepository extends BaseRepository<Key> {
    Optional<Key> findByCode(String code);

    List<Key> findByStatusIn(Collection<KeyStatus> statuses);

    boolean existsByCode(String code);
}

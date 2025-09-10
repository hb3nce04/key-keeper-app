package io.hb3nce04.keykeeperapp.repository;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;

@Repository
public interface KeyRepository extends BaseRepository<Key> {
}

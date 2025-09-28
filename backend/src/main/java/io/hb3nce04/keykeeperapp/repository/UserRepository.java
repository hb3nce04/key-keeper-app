package io.hb3nce04.keykeeperapp.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.model.entity.User;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;

@Repository
public interface UserRepository extends BaseRepository<User> {
    Optional<User> findByUsername(String username);
}

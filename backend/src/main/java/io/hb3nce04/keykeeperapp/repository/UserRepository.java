package io.hb3nce04.keykeeperapp.repository;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.model.entity.User;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;

@Repository
public interface UserRepository extends BaseRepository<User> {
    User findByUsername(String username);
}

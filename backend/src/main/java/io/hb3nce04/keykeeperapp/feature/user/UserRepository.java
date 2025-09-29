package io.hb3nce04.keykeeperapp.feature.user;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.common.repository.BaseRepository;
import io.hb3nce04.keykeeperapp.feature.user.model.entity.User;

@Repository
public interface UserRepository extends BaseRepository<User> {
    Optional<User> findByUsername(String username);
}

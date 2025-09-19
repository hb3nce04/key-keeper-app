package io.hb3nce04.keykeeperapp.service;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.UserMapper;
import io.hb3nce04.keykeeperapp.model.dto.UserDto;
import io.hb3nce04.keykeeperapp.model.entity.User;
import io.hb3nce04.keykeeperapp.repository.UserRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class UserService extends AbstractCrudService<User, UserDto, UserRepository, UserMapper> {
    public UserService(
            UserRepository repository,
            UserMapper mapper) {
        super(repository, mapper);
    }
}

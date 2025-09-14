package io.hb3nce04.keykeeperapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.UserMapper;
import io.hb3nce04.keykeeperapp.model.dto.UserDto;
import io.hb3nce04.keykeeperapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper mapper;
    private final UserRepository userRepository;

    public List<UserDto> findAll() {
        return mapper.toDtoList(userRepository.findAll());
    }
}

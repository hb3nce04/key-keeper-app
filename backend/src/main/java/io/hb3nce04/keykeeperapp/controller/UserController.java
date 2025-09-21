package io.hb3nce04.keykeeperapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.controller.common.AbstractCrudController;
import io.hb3nce04.keykeeperapp.mapper.UserMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.UserRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.UserResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.User;
import io.hb3nce04.keykeeperapp.repository.UserRepository;
import io.hb3nce04.keykeeperapp.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController extends AbstractCrudController<UserService, User, UserRequestDto, UserResponseDto, UserRepository, UserMapper> {
    public UserController(UserService service) {
        super(service);
    }
}

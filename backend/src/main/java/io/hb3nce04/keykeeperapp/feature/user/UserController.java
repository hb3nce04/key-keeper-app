package io.hb3nce04.keykeeperapp.feature.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.common.controller.AbstractCrudController;
import io.hb3nce04.keykeeperapp.feature.user.model.entity.User;
import io.hb3nce04.keykeeperapp.feature.user.model.dto.UserRequestDto;
import io.hb3nce04.keykeeperapp.feature.user.model.dto.UserResponseDto;
import io.hb3nce04.keykeeperapp.feature.user.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController extends AbstractCrudController<UserService, User, UserRequestDto, UserResponseDto, UserRepository, UserMapper> {
    public UserController(UserService service) {
        super(service, true, true, true, true);
    }
}

package io.hb3nce04.keykeeperapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.model.dto.UserDto;
import io.hb3nce04.keykeeperapp.model.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDTO(User user);

    List<UserDto> toDtoList(List<User> users);
}

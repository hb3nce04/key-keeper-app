package io.hb3nce04.keykeeperapp.feature.user;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.feature.user.model.entity.User;
import io.hb3nce04.keykeeperapp.feature.user.model.dto.UserRequestDto;
import io.hb3nce04.keykeeperapp.feature.user.model.dto.UserResponseDto;

@Mapper(config = BaseMapper.class)
public interface UserMapper extends BaseMapper<UserRequestDto, UserResponseDto, User> {
}

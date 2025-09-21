package io.hb3nce04.keykeeperapp.mapper;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.UserRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.UserResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.User;

@Mapper(config = BaseMapper.class)
public interface UserMapper extends BaseMapper<UserRequestDto, UserResponseDto, User> {
}

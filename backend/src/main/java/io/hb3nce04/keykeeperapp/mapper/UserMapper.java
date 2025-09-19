package io.hb3nce04.keykeeperapp.mapper;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.UserDto;
import io.hb3nce04.keykeeperapp.model.entity.User;

@Mapper(config = BaseMapper.class)
public interface UserMapper extends BaseMapper<UserDto, User> {
}

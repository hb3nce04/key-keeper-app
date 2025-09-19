package io.hb3nce04.keykeeperapp.mapper;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.KeyDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;

@Mapper(config = BaseMapper.class)
public interface KeyMapper extends BaseMapper<KeyDto, Key> {
}

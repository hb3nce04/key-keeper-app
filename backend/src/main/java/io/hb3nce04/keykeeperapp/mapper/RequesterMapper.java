package io.hb3nce04.keykeeperapp.mapper;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.RequesterRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.RequesterResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Requester;

@Mapper(config = BaseMapper.class)
public interface RequesterMapper extends BaseMapper<RequesterRequestDto, RequesterResponseDto, Requester> {
}

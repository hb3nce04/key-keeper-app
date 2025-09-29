package io.hb3nce04.keykeeperapp.feature.requester;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.feature.requester.model.entity.Requester;
import io.hb3nce04.keykeeperapp.feature.requester.model.dto.RequesterRequestDto;
import io.hb3nce04.keykeeperapp.feature.requester.model.dto.RequesterResponseDto;

@Mapper(config = BaseMapper.class)
public interface RequesterMapper extends BaseMapper<RequesterRequestDto, RequesterResponseDto, Requester> {
}

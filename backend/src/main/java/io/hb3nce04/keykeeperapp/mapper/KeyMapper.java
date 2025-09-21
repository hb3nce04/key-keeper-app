package io.hb3nce04.keykeeperapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.KeyRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.KeyResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;

@Mapper(config = BaseMapper.class)
public interface KeyMapper extends BaseMapper<KeyRequestDto, KeyResponseDto, Key> {
    @Mapping(source = "roomId", target = "room.id")
    Key toEntity(KeyRequestDto dto);

    @Mapping(target = "room", ignore = true)
    void updateEntity(
            KeyRequestDto dto,
            @MappingTarget Key entity);
}

package io.hb3nce04.keykeeperapp.feature.key;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.feature.key.model.entity.Key;
import io.hb3nce04.keykeeperapp.feature.key.model.dto.request.KeyRequestDto;
import io.hb3nce04.keykeeperapp.feature.key.model.dto.response.KeyResponseDto;

@Mapper(config = BaseMapper.class)
public interface KeyMapper extends BaseMapper<KeyRequestDto, KeyResponseDto, Key> {
    @Mapping(source = "roomId", target = "room.id")
    Key toEntity(KeyRequestDto dto);

    @Mapping(target = "room", ignore = true)
    @Mapping(target = "status", ignore = true)
    void updateEntity(
            KeyRequestDto dto,
            @MappingTarget Key entity);
}

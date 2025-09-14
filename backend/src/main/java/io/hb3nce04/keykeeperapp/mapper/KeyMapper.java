package io.hb3nce04.keykeeperapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.model.dto.KeyDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;

@Mapper(componentModel = "spring")
public interface KeyMapper {
    KeyDto toDTO(Key key);

    List<KeyDto> toDtoList(List<Key> keys);
}


package io.hb3nce04.keykeeperapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.model.dto.RequesterDto;
import io.hb3nce04.keykeeperapp.model.entity.Requester;

@Mapper(componentModel = "spring")
public interface RequesterMapper {
    RequesterDto toDTO(Requester requester);

    List<RequesterDto> toDtoList(List<Requester> requesters);
}

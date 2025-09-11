package io.hb3nce04.keykeeperapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.model.dto.RoomDto;
import io.hb3nce04.keykeeperapp.model.entity.Room;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    RoomDto toDTO(Room room);

    List<RoomDto> toDtoList(List<Room> rooms);
}

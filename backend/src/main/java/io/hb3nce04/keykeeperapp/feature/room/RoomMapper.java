package io.hb3nce04.keykeeperapp.feature.room;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.feature.room.model.dto.RoomRequestDto;
import io.hb3nce04.keykeeperapp.feature.room.model.dto.RoomResponseDto;
import io.hb3nce04.keykeeperapp.feature.room.model.entity.Room;

@Mapper(config = BaseMapper.class)
public interface RoomMapper extends BaseMapper<RoomRequestDto, RoomResponseDto, Room> {
}

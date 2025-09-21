package io.hb3nce04.keykeeperapp.mapper;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.RoomRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.RoomResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Room;

@Mapper(config = BaseMapper.class)
public interface RoomMapper extends BaseMapper<RoomRequestDto, RoomResponseDto, Room> {
}

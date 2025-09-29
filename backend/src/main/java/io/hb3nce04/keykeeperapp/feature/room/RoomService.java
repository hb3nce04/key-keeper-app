package io.hb3nce04.keykeeperapp.feature.room;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.common.service.AbstractCrudService;
import io.hb3nce04.keykeeperapp.feature.room.model.dto.RoomRequestDto;
import io.hb3nce04.keykeeperapp.feature.room.model.dto.RoomResponseDto;
import io.hb3nce04.keykeeperapp.feature.room.model.entity.Room;

@Service
public class RoomService extends AbstractCrudService<Room, RoomRequestDto, RoomResponseDto, RoomRepository, RoomMapper> {
    public RoomService(
            RoomRepository repository,
            RoomMapper mapper) {
        super(repository, mapper);
    }
}

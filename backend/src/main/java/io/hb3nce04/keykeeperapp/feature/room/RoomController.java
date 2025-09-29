package io.hb3nce04.keykeeperapp.feature.room;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.common.controller.AbstractCrudController;
import io.hb3nce04.keykeeperapp.feature.room.model.dto.RoomRequestDto;
import io.hb3nce04.keykeeperapp.feature.room.model.dto.RoomResponseDto;
import io.hb3nce04.keykeeperapp.feature.room.model.entity.Room;

@RestController
@RequestMapping("/rooms")
public class RoomController extends AbstractCrudController<RoomService, Room, RoomRequestDto, RoomResponseDto, RoomRepository, RoomMapper> {
    public RoomController(RoomService service) {
        super(service, true, true, true, true);
    }
}

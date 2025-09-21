package io.hb3nce04.keykeeperapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.controller.common.AbstractCrudController;
import io.hb3nce04.keykeeperapp.mapper.RoomMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.RoomRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.RoomResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Room;
import io.hb3nce04.keykeeperapp.repository.RoomRepository;
import io.hb3nce04.keykeeperapp.service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController extends AbstractCrudController<RoomService, Room, RoomRequestDto, RoomResponseDto, RoomRepository, RoomMapper> {
    public RoomController(RoomService service) {
        super(service);
    }
}

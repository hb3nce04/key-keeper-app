package io.hb3nce04.keykeeperapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.controller.common.AbstractCrudController;
import io.hb3nce04.keykeeperapp.mapper.RoomMapper;
import io.hb3nce04.keykeeperapp.model.dto.RoomDto;
import io.hb3nce04.keykeeperapp.model.entity.Room;
import io.hb3nce04.keykeeperapp.repository.RoomRepository;
import io.hb3nce04.keykeeperapp.service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController extends AbstractCrudController<RoomService, Room, RoomDto, RoomRepository, RoomMapper> {
    public RoomController(RoomService service) {
        super(service);
    }
}

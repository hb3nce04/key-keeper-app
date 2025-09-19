package io.hb3nce04.keykeeperapp.service;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.RoomMapper;
import io.hb3nce04.keykeeperapp.model.dto.RoomDto;
import io.hb3nce04.keykeeperapp.model.entity.Room;
import io.hb3nce04.keykeeperapp.repository.RoomRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class RoomService extends AbstractCrudService<Room, RoomDto, RoomRepository, RoomMapper> {
    public RoomService(
            RoomRepository repository,
            RoomMapper mapper) {
        super(repository, mapper);
    }
}

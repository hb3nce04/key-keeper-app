package io.hb3nce04.keykeeperapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.RoomMapper;
import io.hb3nce04.keykeeperapp.model.dto.RoomDto;
import io.hb3nce04.keykeeperapp.repository.RoomRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomMapper mapper;
    private final RoomRepository repository;

    public List<RoomDto> findAll() {
        return mapper.toDtoList(repository.findAll());
    }
}

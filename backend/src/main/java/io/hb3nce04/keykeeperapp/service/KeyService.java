package io.hb3nce04.keykeeperapp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.KeyMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.KeyRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.KeyResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.model.entity.Room;
import io.hb3nce04.keykeeperapp.repository.KeyRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class KeyService extends AbstractCrudService<Key, KeyRequestDto, KeyResponseDto, KeyRepository, KeyMapper> {
    private final RoomService roomService;

    public KeyService(
            KeyRepository repository,
            KeyMapper mapper,
            RoomService roomService) {
        super(repository, mapper);
        this.roomService = roomService;
    }

    @Override
    public KeyResponseDto update(Long id, KeyRequestDto dto) {
        Room room = roomService.findEntityByIdOrThrow(dto.getRoomId());
        Key entity = findEntityByIdOrThrow(id);
        mapper.updateEntity(dto, entity);
        entity.setRoom(room);
        return mapper.toDto(repository.save(entity));
    }

    public Optional<KeyResponseDto> findByCode(String code) {
        return Optional.ofNullable(this.mapper.toDto(this.repository.findByCode(code)));
    }
}

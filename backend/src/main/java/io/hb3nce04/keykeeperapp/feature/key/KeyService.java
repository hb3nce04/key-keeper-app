package io.hb3nce04.keykeeperapp.feature.key;

import java.util.List;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.feature.key.model.entity.Key;
import io.hb3nce04.keykeeperapp.feature.key.model.dto.request.KeyRequestDto;
import io.hb3nce04.keykeeperapp.feature.key.model.dto.response.KeyResponseDto;
import io.hb3nce04.keykeeperapp.feature.key.model.dto.request.UpdateKeyStatusRequestDto;
import io.hb3nce04.keykeeperapp.feature.key.model.enums.KeyStatus;
import io.hb3nce04.keykeeperapp.feature.room.RoomService;
import io.hb3nce04.keykeeperapp.common.exception.BusinessLogicException;
import io.hb3nce04.keykeeperapp.common.exception.EntityNotFoundException;
import io.hb3nce04.keykeeperapp.feature.room.model.entity.Room;
import io.hb3nce04.keykeeperapp.common.service.AbstractCrudService;

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

    public KeyStatus setStatusReturnedByCode(String code) {
        Key entity = repository.findByCode(code).orElseThrow(() -> new EntityNotFoundException("Ilyen kodú kulcs nem található!"));
        return this.changeStatusToReturned(entity);
    }

    public List<KeyResponseDto> findAvailable() {
        return mapper.toDtoList(repository.findByStatusIn(List.of(KeyStatus.BORROWED, KeyStatus.RETURNED)));
    }

    public List<KeyResponseDto> findReturned() {
        return mapper.toDtoList(repository.findByStatusIn(List.of(KeyStatus.RETURNED)));
    }

    @Override
    public KeyResponseDto create(KeyRequestDto dto) {
        validateCode(dto.getCode());
        Key entity = mapper.toEntity(dto);

        entity.setStatus(KeyStatus.RETURNED);

        return mapper.toDto(repository.save(entity));
    }

    @Override
    public KeyResponseDto update(Long id, KeyRequestDto dto) {
        validateCode(dto.getCode());
        Room room = roomService.findEntityByIdOrThrow(dto.getRoomId());
        Key entity = findEntityByIdOrThrow(id);

        mapper.updateEntity(dto, entity);
        entity.setRoom(room);

        return mapper.toDto(repository.save(entity));
    }

    public KeyStatus updateStatus(UpdateKeyStatusRequestDto dto) {
        Long keyId = dto.getId();
        KeyStatus newStatus = dto.getStatus();

        if (newStatus.equals(KeyStatus.RETURNED) || newStatus.equals(KeyStatus.BORROWED)) {
            throw new BusinessLogicException("A kulcs állapota ily módon közvetlenül nem módosítható!");
        }

        Key entity = findEntityByIdOrThrow(keyId);
        KeyStatus oldStatus = entity.getStatus();

        if (oldStatus.equals(KeyStatus.LOST) || oldStatus.equals(KeyStatus.BROKEN)) {
            throw new BusinessLogicException("Elveszett vagy sérült kulcs állapotát nem lehet közvetlenül módosítani!");
        }

        entity.setStatus(newStatus);

        mapper.toDto(repository.save(entity));

        return newStatus;
    }

    private void validateCode(String code) {
        if (repository.existsByCode(code)) {
            throw new BusinessLogicException("Ilyen kódú kulcs már létezik a rendszerben!");
        }
    }

    public KeyStatus changeStatusToReturned(Key key) {
        if (key.getStatus() != KeyStatus.BORROWED) {
            throw new BusinessLogicException("A kulcs jelenleg nincs kikérve!");
        }

        key.setStatus(KeyStatus.RETURNED);
        repository.save(key);

        return key.getStatus();
    }
}

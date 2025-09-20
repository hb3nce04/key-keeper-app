package io.hb3nce04.keykeeperapp.service.common;

import java.util.List;

import io.hb3nce04.keykeeperapp.exception.EntityNotFoundException;
import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.entity.common.BaseEntity;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class AbstractCrudService<E extends BaseEntity, D extends BaseDto, R extends BaseRepository<E>, M extends BaseMapper<D, E>> {
    protected final R repository;
    protected final M mapper;

    public D create(D dto) throws MessagingException {
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public List<D> findAll() {
        return mapper.toDtoList(repository.findAll());
    }

    public D findById(Long id) {
        return mapper.toDto(findEntityByIdOrThrow(id));
    }

    public void delete(Long id) {
        E entity = findEntityByIdOrThrow(id);
        repository.delete(entity);
    }

    public D update(Long id, D dto) {
        E entity = findEntityByIdOrThrow(id);
        mapper.updateEntity(dto, entity);
        return mapper.toDto(repository.save(entity));
    }

    private E findEntityByIdOrThrow(Long id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Az adott erőforrás nem található! (ID: %d)", id)));
    }
}

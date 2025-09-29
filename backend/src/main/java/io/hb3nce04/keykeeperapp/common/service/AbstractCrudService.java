package io.hb3nce04.keykeeperapp.common.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import io.hb3nce04.keykeeperapp.common.exception.BusinessLogicException;
import io.hb3nce04.keykeeperapp.common.exception.EntityNotFoundException;
import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import io.hb3nce04.keykeeperapp.common.model.entity.BaseEntity;
import io.hb3nce04.keykeeperapp.common.repository.BaseRepository;
import io.hb3nce04.keykeeperapp.common.model.UserDetailsImpl;
import lombok.RequiredArgsConstructor;

/**
 * Absztrakt CRUD Service osztály.
 * @param <E> JPA Entity típus
 * @param <REQ> Request DTO típus (input a kliens felől)
 * @param <RES> Response DTO típus (output a kliens felé)
 * @param <R> Repository típus (Spring Data JPA)
 * @param <M> Mapper típus (BaseMapper, ami tudja konvertálni REQ <-> E <-> RES)
 */
@RequiredArgsConstructor
public abstract class AbstractCrudService<E extends BaseEntity, REQ, RES extends BaseDto, R extends BaseRepository<E>, M extends BaseMapper<REQ, RES, E>> {
    protected final R repository;
    protected final M mapper;

    public RES create(REQ dto) {
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public List<RES> findAll() {
        return mapper.toDtoList(repository.findAll());
    }

    public RES findById(Long id) {
        return mapper.toDto(findEntityByIdOrThrow(id));
    }

    public void delete(Long id) {
        E entity = findEntityByIdOrThrow(id);
        repository.delete(entity);
    }

    public RES update(Long id, REQ dto) {
        E entity = findEntityByIdOrThrow(id);
        mapper.updateEntity(dto, entity);
        return mapper.toDto(repository.save(entity));
    }

    public E findEntityByIdOrThrow(Long id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Az adott erőforrás nem található! (ID: %d)", id)));
    }

    public Long count() {
        return repository.count();
    }

    protected Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BusinessLogicException("Nem sikerült a felhasználó azonosítása!");
        }

        UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();

        return principal.getId();
    }

    protected Boolean isCurrentUserAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BusinessLogicException("Nem sikerült a felhasználó azonosítása!");
        }

        Object principalObj = authentication.getPrincipal();
        if (!(principalObj instanceof UserDetailsImpl principal)) {
            throw new BusinessLogicException("Nem sikerült a felhasználó azonosítása!");
        }

        return principal.getAuthorities()
                .stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
    }
}

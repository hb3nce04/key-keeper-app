package io.hb3nce04.keykeeperapp.controller.common;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.hb3nce04.keykeeperapp.mapper.common.BaseMapper;
import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.entity.common.BaseEntity;
import io.hb3nce04.keykeeperapp.repository.common.BaseRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;
import lombok.RequiredArgsConstructor;

/**
 * Absztrakt CRUD controller generikus CRUD műveletekhez.
 * @param <S> Service típusa, ami kezeli az üzleti logikát (AbstractCrudService)
 * @param <E> Entity típus (JPA entitás)
 * @param <REQ> Request DTO típus (klienstől érkező adatok)
 * @param <RES> Response DTO típus (visszaküldött adatok, BaseDto leszármazott)
 * @param <R> Repository típus (Spring Data JPA Repository)
 * @param <M> Mapper típus (BaseMapper, ami tudja konvertálni REQ <-> E <-> RES)
 */
@RequiredArgsConstructor
public abstract class AbstractCrudController<S extends AbstractCrudService<E, REQ, RES, R, M>, E extends BaseEntity, REQ, RES extends BaseDto, R extends BaseRepository<E>, M extends BaseMapper<REQ, RES, E>> {
    protected final S service;

    public final boolean requireAdminToCreate;
    public final boolean requireAdminToRead;
    public final boolean requireAdminToUpdate;
    public final boolean requireAdminToDelete;

    @PostMapping
    @PreAuthorize("@controllerSecurity.can(authentication, this.requireAdminToCreate)")
    public ResponseEntity<RES> create(@RequestBody @Validated REQ dto) {
        RES createdDto = service.create(dto);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(1).toUri()).body(createdDto);
    }

    @GetMapping
    @PreAuthorize("@controllerSecurity.can(authentication, this.requireAdminToRead)")
    public ResponseEntity<List<RES>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("@controllerSecurity.can(authentication, this.requireAdminToRead)")
    public ResponseEntity<RES> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("@controllerSecurity.can(authentication, this.requireAdminToUpdate)")
    public ResponseEntity<RES> update(
            @PathVariable Long id,
            @RequestBody @Validated REQ dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@controllerSecurity.can(authentication, this.requireAdminToDelete)")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

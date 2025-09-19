package io.hb3nce04.keykeeperapp.controller.common;

import java.util.List;

import org.springframework.http.ResponseEntity;
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

@RequiredArgsConstructor
public abstract class AbstractCrudController<S extends AbstractCrudService<E, D, R, M>, E extends BaseEntity, D extends BaseDto, R extends BaseRepository<E>, M extends BaseMapper<D, E>> {
    protected final S service;

    @PostMapping
    public ResponseEntity<D> create(@RequestBody @Validated D student) {
        D createdDto = service.create(student);
        return ResponseEntity.created(ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(1)
                .toUri()).body(createdDto);
    }

    @GetMapping
    public ResponseEntity<List<D>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<D> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<D> update(@PathVariable Long id, @RequestBody @Validated D dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

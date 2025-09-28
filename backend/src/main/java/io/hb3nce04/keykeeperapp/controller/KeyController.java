package io.hb3nce04.keykeeperapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.controller.common.AbstractCrudController;
import io.hb3nce04.keykeeperapp.mapper.KeyMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.KeyRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.request.UpdateKeyStatusRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.KeyResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.model.enums.KeyStatus;
import io.hb3nce04.keykeeperapp.repository.KeyRepository;
import io.hb3nce04.keykeeperapp.service.KeyService;

@RestController
@RequestMapping("/keys")
public class KeyController extends AbstractCrudController<KeyService, Key, KeyRequestDto, KeyResponseDto, KeyRepository, KeyMapper> {
    private final KeyService keyService;

    public KeyController(KeyService service) {
        super(service, true, false, true, true);
        this.keyService = service;
    }

    @GetMapping("/available")
    public ResponseEntity<Iterable<KeyResponseDto>> findAvailable() {
        return ResponseEntity.ok(keyService.findAvailable());
    }

    @GetMapping("/returned")
    public ResponseEntity<Iterable<KeyResponseDto>> findReturned() {
        return ResponseEntity.ok(keyService.findReturned());
    }

    @PatchMapping("/{code}/return")
    public ResponseEntity<KeyStatus> setStatusReturnedByCode(@PathVariable String code) {
        return ResponseEntity.ok(keyService.setStatusReturnedByCode(code));
    }

    @PatchMapping("/status")
    public ResponseEntity<KeyStatus> updateStatus(
            @RequestBody UpdateKeyStatusRequestDto dto) {
        return ResponseEntity.ok(keyService.updateStatus(dto));
    }
}

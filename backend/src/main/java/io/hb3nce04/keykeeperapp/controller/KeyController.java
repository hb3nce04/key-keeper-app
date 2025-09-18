package io.hb3nce04.keykeeperapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.model.dto.KeyDto;
import io.hb3nce04.keykeeperapp.service.KeyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/keys")
@RequiredArgsConstructor
public class KeyController {
    private final KeyService service;

    @GetMapping
    public ResponseEntity<List<KeyDto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/by-code/{code}")
    public ResponseEntity<KeyDto> findByCode(@PathVariable String code) {
        Optional<KeyDto> key = service.findByCode(code);
        return key.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

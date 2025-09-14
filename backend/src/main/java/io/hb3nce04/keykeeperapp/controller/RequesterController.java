package io.hb3nce04.keykeeperapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.model.dto.RequesterDto;
import io.hb3nce04.keykeeperapp.service.RequesterService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/requesters")
@RequiredArgsConstructor
public class RequesterController {
    private final RequesterService service;

    @GetMapping
    public ResponseEntity<List<RequesterDto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
}

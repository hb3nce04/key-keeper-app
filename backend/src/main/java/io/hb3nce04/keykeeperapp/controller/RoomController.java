package io.hb3nce04.keykeeperapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.model.dto.RoomDto;
import io.hb3nce04.keykeeperapp.service.RoomService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDto>> findAll() {
        return ResponseEntity.ok(roomService.findAll());
    }
}

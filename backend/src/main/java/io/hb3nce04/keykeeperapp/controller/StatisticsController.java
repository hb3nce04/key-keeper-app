package io.hb3nce04.keykeeperapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.model.dto.StatisticsDto;
import io.hb3nce04.keykeeperapp.service.StatisticsService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService service;

    @GetMapping
    public ResponseEntity<StatisticsDto> getStatistics() {
        return ResponseEntity.ok(this.service.getStatistics());
    }
}

package io.hb3nce04.keykeeperapp.feature.statistics;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService service;

    @GetMapping
    @PreAuthorize("@controllerSecurity.can(authentication, false)")
    public ResponseEntity<StatisticsDto> getStatistics() {
        return ResponseEntity.ok(this.service.getStatistics());
    }
}

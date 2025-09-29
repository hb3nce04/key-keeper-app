package io.hb3nce04.keykeeperapp.service;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.model.dto.StatisticsDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final BorrowingService borrowingService;
    private final KeyService keyService;
    private final RoomService roomService;
    private final RequesterService requesterService;
    private final UserService userService;

    public StatisticsDto getStatistics() {
        return StatisticsDto.builder()
                .borrowingCount(borrowingService.count())
                .keyCount(keyService.count())
                .roomCount(roomService.count())
                .requesterCount(requesterService.count())
                .userCount(userService.count())
                .build();
    }
}

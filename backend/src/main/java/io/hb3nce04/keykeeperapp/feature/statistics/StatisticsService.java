package io.hb3nce04.keykeeperapp.feature.statistics;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.feature.borrowing.BorrowingService;
import io.hb3nce04.keykeeperapp.feature.key.KeyService;
import io.hb3nce04.keykeeperapp.feature.requester.RequesterService;
import io.hb3nce04.keykeeperapp.feature.room.RoomService;
import io.hb3nce04.keykeeperapp.feature.user.service.UserService;
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

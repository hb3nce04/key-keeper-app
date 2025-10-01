package io.hb3nce04.keykeeperapp.feature.statistics;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.feature.assignment.AssignmentService;
import io.hb3nce04.keykeeperapp.feature.key.KeyService;
import io.hb3nce04.keykeeperapp.feature.applicant.ApplicantService;
import io.hb3nce04.keykeeperapp.feature.room.RoomService;
import io.hb3nce04.keykeeperapp.feature.user.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final AssignmentService assignmentService;
    private final KeyService keyService;
    private final RoomService roomService;
    private final ApplicantService applicantService;
    private final UserService userService;

    public StatisticsDto getStatistics() {
        return StatisticsDto.builder()
                .assignmentCount(assignmentService.count())
                .keyCount(keyService.count())
                .roomCount(roomService.count())
                .applicantCount(applicantService.count())
                .userCount(userService.count())
                .build();
    }
}

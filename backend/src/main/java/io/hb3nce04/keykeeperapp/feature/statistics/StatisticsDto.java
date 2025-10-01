package io.hb3nce04.keykeeperapp.feature.statistics;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class StatisticsDto {
    private Long assignmentCount;
    private Long keyCount;
    private Long roomCount;
    private Long applicantCount;
    private Long userCount;
}

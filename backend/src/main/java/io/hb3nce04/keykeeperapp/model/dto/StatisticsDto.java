package io.hb3nce04.keykeeperapp.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class StatisticsDto {
    private Long borrowingCount;
    private Long keyCount;
    private Long roomCount;
    private Long requesterCount;
    private Long userCount;
}

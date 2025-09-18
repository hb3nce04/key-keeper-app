package io.hb3nce04.keykeeperapp.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.BorrowingStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BorrowingDto extends BaseDto {
    private LocalTime startTime;

    private LocalTime endTime;

    private LocalDate date;

    private BorrowingStatus status;

    private KeyDto key;

    private RequesterDto requester;
}

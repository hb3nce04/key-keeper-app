package io.hb3nce04.keykeeperapp.model.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.BorrowingStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowingResponseDto extends BaseDto {
    private LocalTime startTime;

    private LocalTime endTime;

    private LocalDate date;

    private BorrowingStatus status;

    private KeyResponseDto key;

    private RequesterResponseDto requester;
}

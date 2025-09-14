package io.hb3nce04.keykeeperapp.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import io.hb3nce04.keykeeperapp.model.enums.BorrowingStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowingDto {
    private LocalTime startTime;

    private LocalTime endTime;

    private LocalDate date;

    private BorrowingStatus status;

    private KeyDto key;
}

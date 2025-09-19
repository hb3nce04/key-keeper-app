package io.hb3nce04.keykeeperapp.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.BorrowingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BorrowingDto extends BaseDto {
    @NotNull(message = "Kitöltése kötelező")
    private LocalTime startTime;

    private LocalTime endTime;

    @NotNull(message = "Kitöltése kötelező")
    private LocalDate date;

    @NotNull(message = "Kitöltése kötelező")
    private BorrowingStatus status;

    private KeyDto key;

    private RequesterDto requester;
}

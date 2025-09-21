package io.hb3nce04.keykeeperapp.model.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import io.hb3nce04.keykeeperapp.model.enums.BorrowingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowingRequestDto {
    @NotNull(message = "Kitöltése kötelező")
    private LocalTime startTime;

    private LocalTime endTime;

    @NotNull(message = "Kitöltése kötelező")
    private LocalDate date;

    @NotNull(message = "Kitöltése kötelező")
    private BorrowingStatus status;

    @NotNull(message = "Kitöltése kötelező")
    private Long keyId;

    @NotNull(message = "Kitöltése kötelező")
    private Long requesterId;
}

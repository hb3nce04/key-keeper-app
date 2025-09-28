package io.hb3nce04.keykeeperapp.model.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

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
    private Long keyId;

    @NotNull(message = "Kitöltése kötelező")
    private Long requesterId;
}

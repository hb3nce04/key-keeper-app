package io.hb3nce04.keykeeperapp.model.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowingResponseDto extends BaseDto {
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;

    private LocalDate date;

    private KeyResponseDto key;

    private RequesterResponseDto requester;
}

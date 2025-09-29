package io.hb3nce04.keykeeperapp.feature.borrowing.model.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.hb3nce04.keykeeperapp.feature.key.model.dto.response.KeyResponseDto;
import io.hb3nce04.keykeeperapp.feature.requester.model.dto.RequesterResponseDto;
import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
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

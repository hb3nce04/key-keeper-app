package io.hb3nce04.keykeeperapp.feature.assignment.model.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.hb3nce04.keykeeperapp.feature.key.model.dto.response.KeyResponseDto;
import io.hb3nce04.keykeeperapp.feature.applicant.model.dto.ApplicantResponseDto;
import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentResponseDto extends BaseDto {
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;

    private LocalDate date;

    private KeyResponseDto key;

    private ApplicantResponseDto applicant;
}

package io.hb3nce04.keykeeperapp.feature.applicant.model.dto;

import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import io.hb3nce04.keykeeperapp.feature.applicant.model.enums.ApplicantType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicantResponseDto extends BaseDto {
    private String firstName;

    private String lastName;

    private String personalIdNumber;

    private String emailAddress;

    private String phoneNumber;

    private ApplicantType type;
}

package io.hb3nce04.keykeeperapp.feature.requester.model.dto;

import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import io.hb3nce04.keykeeperapp.feature.requester.model.enums.RequesterType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequesterResponseDto extends BaseDto {
    private String firstName;

    private String lastName;

    private String personalIdNumber;

    private String emailAddress;

    private String phoneNumber;

    private RequesterType type;
}

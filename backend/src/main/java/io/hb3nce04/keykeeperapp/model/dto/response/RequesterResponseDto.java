package io.hb3nce04.keykeeperapp.model.dto.response;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.RequesterType;
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

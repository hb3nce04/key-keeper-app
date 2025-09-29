package io.hb3nce04.keykeeperapp.feature.user.model.dto;

import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto extends BaseDto {
    private String username;

    private String emailAddress;

    private Boolean isAdmin;

    private Boolean isDisabled;
}

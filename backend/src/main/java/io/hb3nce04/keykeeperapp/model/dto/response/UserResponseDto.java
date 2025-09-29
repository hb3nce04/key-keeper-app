package io.hb3nce04.keykeeperapp.model.dto.response;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
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

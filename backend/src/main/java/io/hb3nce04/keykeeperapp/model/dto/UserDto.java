package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends BaseDto {
    private String username;

    private String email_address;

    private UserRole role;
}

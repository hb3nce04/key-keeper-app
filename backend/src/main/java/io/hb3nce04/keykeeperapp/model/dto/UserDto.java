package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends BaseDto {
    @NotEmpty(message = "Kitöltése kötelező")
    @Max(value = 15, message = "Túl hosszú (Max: 15 karakter)")
    private String username;

    @Email(message = "Formátum nem megfelelő")
    private String email_address;

    @NotNull(message = "Kitöltése kötelező")
    private UserRole role;
}

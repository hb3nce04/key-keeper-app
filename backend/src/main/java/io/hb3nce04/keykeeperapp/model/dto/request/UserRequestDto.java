package io.hb3nce04.keykeeperapp.model.dto.request;

import io.hb3nce04.keykeeperapp.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String username;

    @Email(message = "Formátum nem megfelelő")
    private String email_address;

    @NotNull(message = "Kitöltése kötelező")
    private UserRole role;
}

package io.hb3nce04.keykeeperapp.feature.auth.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String username;

    @NotEmpty(message = "Kitöltése kötelező")
    private String password;
}

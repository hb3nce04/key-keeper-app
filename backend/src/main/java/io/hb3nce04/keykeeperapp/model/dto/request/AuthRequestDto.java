package io.hb3nce04.keykeeperapp.model.dto.request;

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

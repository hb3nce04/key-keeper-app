package io.hb3nce04.keykeeperapp.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
    @NotEmpty(message = "Kitöltése kötelező")
    @Size(message = "Hibás hossz! Max: 15", max = 15)
    private String username;

    @Email(message = "Formátum nem megfelelő")
    private String email_address;

    @NotNull(message = "Kitöltése kötelező")
    private Boolean isAdmin;
}

package io.hb3nce04.keykeeperapp.model.dto.request;

import io.hb3nce04.keykeeperapp.model.enums.RequesterType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequesterRequestDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String firstName;

    @NotEmpty(message = "Kitöltése kötelező")
    private String lastName;

    private String personalIdNumber;

    @Email(message = "Formátum nem megfelelő")
    private String emailAddress;

    private String phoneNumber;

    @NotNull(message = "Kitöltése kötelező")
    private RequesterType type;
}

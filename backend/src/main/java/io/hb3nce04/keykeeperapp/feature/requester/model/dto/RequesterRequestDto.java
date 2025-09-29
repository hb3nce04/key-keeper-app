package io.hb3nce04.keykeeperapp.feature.requester.model.dto;

import io.hb3nce04.keykeeperapp.feature.requester.model.enums.RequesterType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequesterRequestDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String firstName;

    @NotEmpty(message = "Kitöltése kötelező")
    private String lastName;

    @Pattern(
            regexp = "^\\d{6}[A-Z]{2}$",
            message = "Formátum nem megfelelő"
    )
    private String personalIdNumber;

    @Email(message = "Formátum nem megfelelő")
    private String emailAddress;

    @Pattern(
            regexp = "^(?:\\+36|06)?\\s?(20|30|31|70)\\s?\\d{3}\\s?\\d{4}$",
            message = "Formátum nem megfelelő"
    )
    private String phoneNumber;

    @NotNull(message = "Kitöltése kötelező")
    private RequesterType type;
}

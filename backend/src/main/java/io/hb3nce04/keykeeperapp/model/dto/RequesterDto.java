package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.RequesterType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequesterDto extends BaseDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String firstName;

    @NotEmpty(message = "Kitöltése kötelező")
    private String lastName;

    private String personalIdNumber;

    private String emailAddress;

    private String phoneNumber;

    @NotNull(message = "Kitöltése kötelező")
    private RequesterType type;
}

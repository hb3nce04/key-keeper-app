package io.hb3nce04.keykeeperapp.feature.key.model.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyRequestDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String code;

    @NotNull(message = "Kitöltése kötelező")
    private Long roomId;
}

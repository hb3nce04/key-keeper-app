package io.hb3nce04.keykeeperapp.feature.key.model.dto.request;

import io.hb3nce04.keykeeperapp.feature.key.model.enums.KeyStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateKeyStatusRequestDto {
    @NotNull(message = "Kitöltése kötelező")
    private Long id;

    @NotNull(message = "Kitöltése kötelező")
    private KeyStatus status;
}

package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyDto extends BaseDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String code;

    @NotNull(message = "Kitöltése kötelező")
    private Long roomId;
}

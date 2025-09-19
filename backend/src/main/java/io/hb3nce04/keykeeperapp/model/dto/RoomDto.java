package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.RoomType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDto extends BaseDto {
    @NotEmpty(message = "Kitöltése kötelező")
    private String code;

    @NotEmpty(message = "Kitöltése kötelező")
    private String name;

    private String floor;

    private String building;

    private Integer capacity;

    private Integer area;

    @NotNull(message = "Kitöltése kötelező")
    private RoomType type;
}

package io.hb3nce04.keykeeperapp.feature.room.model.dto;

import io.hb3nce04.keykeeperapp.feature.room.model.enums.RoomType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRequestDto {
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

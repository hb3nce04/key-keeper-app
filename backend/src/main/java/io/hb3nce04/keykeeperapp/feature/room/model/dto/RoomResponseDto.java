package io.hb3nce04.keykeeperapp.feature.room.model.dto;

import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import io.hb3nce04.keykeeperapp.feature.room.model.enums.RoomType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomResponseDto extends BaseDto {
    private String code;

    private String name;

    private String floor;

    private String building;

    private Integer capacity;

    private Integer area;

    private RoomType type;
}

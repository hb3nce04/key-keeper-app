package io.hb3nce04.keykeeperapp.model.dto.response;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.RoomType;
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

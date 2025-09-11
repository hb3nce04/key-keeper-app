package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.enums.RoomType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDto {
    private String code;

    private String name;

    private String floor;

    private String building;

    private Integer capacity;

    private Integer area;

    private RoomType type;
}

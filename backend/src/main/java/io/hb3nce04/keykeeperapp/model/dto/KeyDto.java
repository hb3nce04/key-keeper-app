package io.hb3nce04.keykeeperapp.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyDto {
    private String code;

    private RoomDto room;
}

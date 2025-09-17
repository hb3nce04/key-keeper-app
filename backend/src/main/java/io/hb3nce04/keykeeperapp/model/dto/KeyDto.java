package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyDto extends BaseDto {
    private String code;

    private RoomDto room;
}

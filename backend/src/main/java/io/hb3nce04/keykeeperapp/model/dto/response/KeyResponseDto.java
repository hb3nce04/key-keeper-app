package io.hb3nce04.keykeeperapp.model.dto.response;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyResponseDto extends BaseDto {
    private String code;

    private RoomResponseDto room;
}

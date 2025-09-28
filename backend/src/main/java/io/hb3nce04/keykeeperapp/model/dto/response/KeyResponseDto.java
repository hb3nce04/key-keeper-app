package io.hb3nce04.keykeeperapp.model.dto.response;

import io.hb3nce04.keykeeperapp.model.dto.common.BaseDto;
import io.hb3nce04.keykeeperapp.model.enums.KeyStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyResponseDto extends BaseDto {
    private String code;

    private RoomResponseDto room;

    private KeyStatus status;
}

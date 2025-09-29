package io.hb3nce04.keykeeperapp.feature.key.model.dto.response;

import io.hb3nce04.keykeeperapp.feature.key.model.enums.KeyStatus;
import io.hb3nce04.keykeeperapp.feature.room.model.dto.RoomResponseDto;
import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyResponseDto extends BaseDto {
    private String code;

    private RoomResponseDto room;

    private KeyStatus status;
}

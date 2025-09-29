package io.hb3nce04.keykeeperapp.common.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ApiErrorResponseDto {
    private String message;
}

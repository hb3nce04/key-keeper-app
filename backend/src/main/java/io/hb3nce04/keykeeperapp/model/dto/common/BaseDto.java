package io.hb3nce04.keykeeperapp.model.dto.common;

import lombok.Getter;
import lombok.Setter;

/**
 * Alap DTO osztály minden Response DTO és/vagy Entity DTO számára.
 */
@Getter
@Setter
public class BaseDto {
    /**
     * Entitás / DTO egyedi azonosítója.
     * Általában az adatbázis által generált ID.
     */
    private Long id;
}

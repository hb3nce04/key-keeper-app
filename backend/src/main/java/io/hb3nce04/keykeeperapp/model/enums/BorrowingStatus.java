package io.hb3nce04.keykeeperapp.model.enums;

/**
 * A kölcsönzés összes lehetséges állapotait tartalmazó enum típus.
 */
public enum BorrowingStatus {
    /**
     * A kölcsönzés jelenleg aktív, a kulcs birtoklás alatt van.
     */
    BORROWED,

    /**
     * A kölcsönzött kulcs vissza lett adva.
     */
    RETURNED,

    /**
     * A kölcsönzött kulcs elveszett.
     */
    LOST,

    /**
     * A kölcsönzött kulcs megsérült / eltört.
     */
    BROKEN

}

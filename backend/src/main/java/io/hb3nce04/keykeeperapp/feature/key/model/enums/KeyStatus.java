package io.hb3nce04.keykeeperapp.feature.key.model.enums;

/**
 * A kulcs összes lehetséges állapotait tartalmazó enum típus.
 */
public enum KeyStatus {
    /**
     * A kulcs birtoklás alatt van.
     */
    BORROWED,

    /**
     * A kulcs vissza lett adva.
     */
    RETURNED,

    /**
     * A kulcs elveszett.
     */
    LOST,

    /**
     * A kulcs megsérült / eltört.
     */
    BROKEN

}

package io.hb3nce04.keykeeperapp.feature.key.model.enums;

/**
 * A kulcs összes lehetséges állapotait tartalmazó enum típus.
 */
public enum KeyStatus {
    /**
     * A kulcs birtoklás alatt van.
     */
    CHECKED_OUT,

    /**
     * A kulcs vissza lett adva.
     */
    AVAILABLE,

    /**
     * A kulcs elveszett.
     */
    LOST,

    /**
     * A kulcs sérült.
     */
    DAMAGED

}

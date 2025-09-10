package io.hb3nce04.keykeeperapp.model.enums;

/**
 * Felhasználói jogosultságokat tartalmazó enum típus.
 */
public enum UserRole {
    /**
     * Globális hozzáférés minden erőforráshoz és művelethez.
     * Adminisztrátorok számára.
     */
    ADMIN,

    /**
     * Adminisztrációs (portai) hozzáférés: kulcsok és nyilvántartás kezelése.
     * Korlátozott, alap felhasználói hozzáférés.
     */
    USER
}

package io.hb3nce04.keykeeperapp.common.model.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

/**
 * Alap JPA entitás osztály minden konkrét entitás számára.
 */
@Getter
@Setter
@MappedSuperclass
public class BaseEntity {
    /**
     * Entitás egyedi azonosítója.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}

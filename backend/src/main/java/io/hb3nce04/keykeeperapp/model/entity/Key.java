package io.hb3nce04.keykeeperapp.model.entity;

import java.util.List;

import io.hb3nce04.keykeeperapp.model.entity.common.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

/**
 * Fizikai kulcsokat adminisztráló tábla.
 */
@Getter
@Setter
@Entity
public class Key extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String code;

    @ManyToOne(optional = false)
    private Room room;

    @OneToMany(mappedBy = "key", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Borrowing> borrowings;
}

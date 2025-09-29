package io.hb3nce04.keykeeperapp.feature.room.model.entity;

import java.util.List;

import io.hb3nce04.keykeeperapp.feature.key.model.entity.Key;
import io.hb3nce04.keykeeperapp.common.model.entity.BaseEntity;
import io.hb3nce04.keykeeperapp.feature.room.model.enums.RoomType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

/**
 * Termeket tartalmazó tábla.
 */
@Getter
@Setter
@Entity
public class Room extends BaseEntity {
    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String name;

    private String floor;

    private String building;

    private Integer capacity;

    private Integer area;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RoomType type = RoomType.CLASSROOM;

    @OneToMany(mappedBy = "room", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Key> keys;
}

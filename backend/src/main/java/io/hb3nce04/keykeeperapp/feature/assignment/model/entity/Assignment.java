package io.hb3nce04.keykeeperapp.feature.assignment.model.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import io.hb3nce04.keykeeperapp.feature.key.model.entity.Key;
import io.hb3nce04.keykeeperapp.feature.user.model.entity.User;
import io.hb3nce04.keykeeperapp.feature.applicant.model.entity.Applicant;
import io.hb3nce04.keykeeperapp.common.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

/**
 * Kölcsönzési eseményeket tartalmazó tábla.
 */
@Getter
@Setter
@Entity
public class Assignment extends BaseEntity {
    @Column(nullable = false)
    private LocalTime startTime;

    @Column
    private LocalTime endTime;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(optional = false)
    private Key key;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Applicant applicant;
}

package io.hb3nce04.keykeeperapp.model.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import io.hb3nce04.keykeeperapp.model.entity.common.BaseEntity;
import io.hb3nce04.keykeeperapp.model.enums.BorrowingStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

/**
 * Kölcsönzési eseményeket tartalmazó tábla.
 */
@Getter
@Setter
@Entity
public class Borrowing extends BaseEntity {
    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BorrowingStatus status = BorrowingStatus.BORROWED;

    @ManyToOne(optional = false)
    private Key key;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Requester requester;
}

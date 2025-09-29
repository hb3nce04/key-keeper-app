package io.hb3nce04.keykeeperapp.feature.requester.model.entity;

import java.util.List;

import io.hb3nce04.keykeeperapp.feature.borrowing.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.common.model.entity.BaseEntity;
import io.hb3nce04.keykeeperapp.feature.requester.model.enums.RequesterType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

/**
 * Igénylő, kölcsönzést igénylő személyeket tartalmazó tábla.
 */
@Getter
@Setter
@Entity
public class Requester extends BaseEntity {
    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(length = 8)
    private String personalIdNumber;

    private String emailAddress;

    private String phoneNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RequesterType type = RequesterType.LECTURER;

    @OneToMany(mappedBy = "requester", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Borrowing> borrowings;
}

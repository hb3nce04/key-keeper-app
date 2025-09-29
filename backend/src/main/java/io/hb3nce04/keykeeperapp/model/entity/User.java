package io.hb3nce04.keykeeperapp.model.entity;

import java.util.List;

import io.hb3nce04.keykeeperapp.model.entity.common.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

/**
 * Felhasználókat tartalmazó tábla.
 */
@Getter
@Setter
@Entity(name = "users")
public class User extends BaseEntity {
    @Column(unique = true, length = 15, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String email_address;

    @Column(nullable = false)
    private Boolean isAdmin = false;

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Borrowing> borrowings;
}

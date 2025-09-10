package io.hb3nce04.keykeeperapp.model.entity;

import java.util.List;

import io.hb3nce04.keykeeperapp.model.entity.common.BaseEntity;
import io.hb3nce04.keykeeperapp.model.enums.UserRole;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

/**
 * Felhasználókat tartalmazó tábla.
 */
@Getter
@Setter
@Entity(name = "`user`")
public class User extends BaseEntity {
    @Column(unique = true, length = 15, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String email_address;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Borrowing> borrowings;
}

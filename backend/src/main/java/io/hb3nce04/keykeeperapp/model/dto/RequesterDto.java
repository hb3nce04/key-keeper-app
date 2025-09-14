package io.hb3nce04.keykeeperapp.model.dto;

import io.hb3nce04.keykeeperapp.model.enums.RequesterType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequesterDto {
    private String firstName;

    private String lastName;

    private String personalIdNumber;

    private String emailAddress;

    private String phoneNumber;

    private RequesterType type;
}

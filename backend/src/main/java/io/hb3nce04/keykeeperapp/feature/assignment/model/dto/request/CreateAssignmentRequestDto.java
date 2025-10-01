package io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAssignmentRequestDto {
    @NotNull(message = "Kitöltése kötelező")
    private Long applicantId;

    @NotNull(message = "Kitöltése kötelező")
    private Long keyId;
}

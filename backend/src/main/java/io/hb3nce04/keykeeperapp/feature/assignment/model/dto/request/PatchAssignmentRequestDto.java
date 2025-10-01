package io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchAssignmentRequestDto {
    @NotNull(message = "Kitöltése kötelező")
    private Long assignmentId;
}

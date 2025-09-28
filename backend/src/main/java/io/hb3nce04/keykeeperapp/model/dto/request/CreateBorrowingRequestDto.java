package io.hb3nce04.keykeeperapp.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBorrowingRequestDto {
    @NotNull(message = "Kitöltése kötelező")
    private Long requesterId;

    @NotNull(message = "Kitöltése kötelező")
    private Long keyId;
}

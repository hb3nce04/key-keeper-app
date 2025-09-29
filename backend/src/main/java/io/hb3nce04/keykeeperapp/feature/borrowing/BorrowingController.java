package io.hb3nce04.keykeeperapp.feature.borrowing;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.hb3nce04.keykeeperapp.common.controller.AbstractCrudController;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.dto.request.BorrowingRequestDto;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.dto.response.BorrowingResponseDto;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.dto.request.CreateBorrowingRequestDto;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.dto.request.ReturnBorrowingRequestDto;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.feature.key.model.enums.KeyStatus;

@RestController
@RequestMapping("/borrowings")
public class BorrowingController
        extends AbstractCrudController<BorrowingService, Borrowing, BorrowingRequestDto, BorrowingResponseDto, BorrowingRepository, BorrowingMapper>
{
    public BorrowingController(
            BorrowingService service) {
        super(service, true, false, true, false);
    }

    @PatchMapping("/return")
    public ResponseEntity<KeyStatus> returnBack(
            @RequestBody @Validated ReturnBorrowingRequestDto dto) {
        return ResponseEntity.ok(service.returnBack(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<BorrowingResponseDto> register(@RequestBody @Validated CreateBorrowingRequestDto dto) {
        BorrowingResponseDto createdDto = service.register(dto);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(1).toUri()).body(createdDto);
    }
}

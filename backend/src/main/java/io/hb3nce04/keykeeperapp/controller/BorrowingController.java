package io.hb3nce04.keykeeperapp.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.controller.common.AbstractCrudController;
import io.hb3nce04.keykeeperapp.mapper.BorrowingMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.BorrowingRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.BorrowingResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Borrowing;
import io.hb3nce04.keykeeperapp.repository.BorrowingRepository;
import io.hb3nce04.keykeeperapp.service.BorrowingService;

@RestController
@RequestMapping("/borrowings")
public class BorrowingController extends AbstractCrudController<BorrowingService, Borrowing, BorrowingRequestDto, BorrowingResponseDto, BorrowingRepository, BorrowingMapper> {
    public BorrowingController(
            BorrowingService service) {
        super(service);
    }

    @GetMapping("/by-code/{code}")
    public ResponseEntity<BorrowingResponseDto> findByCode(@PathVariable String code) {
        Optional<BorrowingResponseDto> key = service.findByCode(code);
        return key.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

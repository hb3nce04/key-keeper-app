package io.hb3nce04.keykeeperapp.feature.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.feature.auth.dto.AuthRequestDto;
import io.hb3nce04.keykeeperapp.feature.auth.dto.AuthResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody @Valid AuthRequestDto dto) {
        return ResponseEntity.ok(authService.login(dto));
    }
}

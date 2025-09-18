package io.hb3nce04.keykeeperapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.KeyMapper;
import io.hb3nce04.keykeeperapp.model.dto.KeyDto;
import io.hb3nce04.keykeeperapp.repository.KeyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KeyService {
    private final KeyMapper mapper;
    private final KeyRepository keyRepository;

    public List<KeyDto> findAll() {
        return mapper.toDtoList(keyRepository.findAll());
    }

    public Optional<KeyDto> findByCode(String code) {
        return Optional.ofNullable(mapper.toDTO(keyRepository.findByCode(code)));
    }
}

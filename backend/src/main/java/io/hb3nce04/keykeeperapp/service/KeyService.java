package io.hb3nce04.keykeeperapp.service;

import java.util.List;

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
}

package io.hb3nce04.keykeeperapp.service;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.KeyMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.KeyRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.KeyResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.repository.KeyRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class KeyService extends AbstractCrudService<Key, KeyRequestDto, KeyResponseDto, KeyRepository, KeyMapper> {
    public KeyService(
            KeyRepository repository,
            KeyMapper mapper) {
        super(repository, mapper);
    }
}

package io.hb3nce04.keykeeperapp.service;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.KeyMapper;
import io.hb3nce04.keykeeperapp.model.dto.KeyDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.repository.KeyRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class KeyService extends AbstractCrudService<Key, KeyDto, KeyRepository, KeyMapper> {
    public KeyService(
            KeyRepository repository,
            KeyMapper mapper) {
        super(repository, mapper);
    }
}

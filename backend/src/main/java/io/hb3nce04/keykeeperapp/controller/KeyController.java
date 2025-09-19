package io.hb3nce04.keykeeperapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.controller.common.AbstractCrudController;
import io.hb3nce04.keykeeperapp.mapper.KeyMapper;
import io.hb3nce04.keykeeperapp.model.dto.KeyDto;
import io.hb3nce04.keykeeperapp.model.entity.Key;
import io.hb3nce04.keykeeperapp.repository.KeyRepository;
import io.hb3nce04.keykeeperapp.service.KeyService;

@RestController
@RequestMapping("/keys")
public class KeyController extends AbstractCrudController<KeyService, Key, KeyDto, KeyRepository, KeyMapper> {
    public KeyController(KeyService service) {
        super(service);
    }
}

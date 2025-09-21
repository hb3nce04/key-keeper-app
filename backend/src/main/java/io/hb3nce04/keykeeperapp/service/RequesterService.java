package io.hb3nce04.keykeeperapp.service;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.RequesterMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.RequesterRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.RequesterResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Requester;
import io.hb3nce04.keykeeperapp.repository.RequesterRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;

@Service
public class RequesterService extends AbstractCrudService<Requester, RequesterRequestDto, RequesterResponseDto, RequesterRepository, RequesterMapper> {
    public RequesterService(
            RequesterRepository repository,
            RequesterMapper mapper) {
        super(repository, mapper);
    }
}

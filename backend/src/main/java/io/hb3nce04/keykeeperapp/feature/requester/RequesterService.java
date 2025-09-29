package io.hb3nce04.keykeeperapp.feature.requester;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.common.service.AbstractCrudService;
import io.hb3nce04.keykeeperapp.feature.requester.model.entity.Requester;
import io.hb3nce04.keykeeperapp.feature.requester.model.dto.RequesterRequestDto;
import io.hb3nce04.keykeeperapp.feature.requester.model.dto.RequesterResponseDto;

@Service
public class RequesterService extends AbstractCrudService<Requester, RequesterRequestDto, RequesterResponseDto, RequesterRepository, RequesterMapper> {
    public RequesterService(
            RequesterRepository repository,
            RequesterMapper mapper) {
        super(repository, mapper);
    }
}

package io.hb3nce04.keykeeperapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.controller.common.AbstractCrudController;
import io.hb3nce04.keykeeperapp.mapper.RequesterMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.RequesterRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.RequesterResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.Requester;
import io.hb3nce04.keykeeperapp.repository.RequesterRepository;
import io.hb3nce04.keykeeperapp.service.RequesterService;

@RestController
@RequestMapping("/requesters")
public class RequesterController
        extends AbstractCrudController<RequesterService, Requester, RequesterRequestDto, RequesterResponseDto, RequesterRepository, RequesterMapper>
{
    public RequesterController(RequesterService service) {
        super(service, true, false, true, true);
    }
}

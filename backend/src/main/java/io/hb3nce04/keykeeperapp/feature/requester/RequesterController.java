package io.hb3nce04.keykeeperapp.feature.requester;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.common.controller.AbstractCrudController;
import io.hb3nce04.keykeeperapp.feature.requester.model.entity.Requester;
import io.hb3nce04.keykeeperapp.feature.requester.model.dto.RequesterRequestDto;
import io.hb3nce04.keykeeperapp.feature.requester.model.dto.RequesterResponseDto;

@RestController
@RequestMapping("/requesters")
public class RequesterController
        extends AbstractCrudController<RequesterService, Requester, RequesterRequestDto, RequesterResponseDto, RequesterRepository, RequesterMapper>
{
    public RequesterController(RequesterService service) {
        super(service, true, false, true, true);
    }
}

package io.hb3nce04.keykeeperapp.feature.applicant;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hb3nce04.keykeeperapp.common.controller.AbstractCrudController;
import io.hb3nce04.keykeeperapp.feature.applicant.model.dto.ApplicantRequestDto;
import io.hb3nce04.keykeeperapp.feature.applicant.model.dto.ApplicantResponseDto;
import io.hb3nce04.keykeeperapp.feature.applicant.model.entity.Applicant;

@RestController
@RequestMapping("/applicants")
public class ApplicantController
        extends AbstractCrudController<ApplicantService, Applicant, ApplicantRequestDto, ApplicantResponseDto, ApplicantRepository, ApplicantMapper>
{
    public ApplicantController(ApplicantService service) {
        super(service, true, false, true, true);
    }
}

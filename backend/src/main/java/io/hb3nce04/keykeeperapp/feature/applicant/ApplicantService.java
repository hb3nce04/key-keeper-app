package io.hb3nce04.keykeeperapp.feature.applicant;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.common.service.AbstractCrudService;
import io.hb3nce04.keykeeperapp.feature.applicant.model.dto.ApplicantRequestDto;
import io.hb3nce04.keykeeperapp.feature.applicant.model.dto.ApplicantResponseDto;
import io.hb3nce04.keykeeperapp.feature.applicant.model.entity.Applicant;

@Service
public class ApplicantService extends AbstractCrudService<Applicant, ApplicantRequestDto, ApplicantResponseDto, ApplicantRepository, ApplicantMapper> {
    public ApplicantService(
            ApplicantRepository repository,
            ApplicantMapper mapper) {
        super(repository, mapper);
    }
}

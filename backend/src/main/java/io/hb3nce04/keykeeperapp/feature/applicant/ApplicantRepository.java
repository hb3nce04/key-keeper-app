package io.hb3nce04.keykeeperapp.feature.applicant;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.common.repository.BaseRepository;
import io.hb3nce04.keykeeperapp.feature.applicant.model.entity.Applicant;

@Repository
public interface ApplicantRepository extends BaseRepository<Applicant> {
}

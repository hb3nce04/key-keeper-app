package io.hb3nce04.keykeeperapp.feature.applicant;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.feature.applicant.model.dto.ApplicantRequestDto;
import io.hb3nce04.keykeeperapp.feature.applicant.model.entity.Applicant;
import io.hb3nce04.keykeeperapp.feature.applicant.model.dto.ApplicantResponseDto;

@Mapper(config = BaseMapper.class)
public interface ApplicantMapper extends BaseMapper<ApplicantRequestDto, ApplicantResponseDto, Applicant> {
}

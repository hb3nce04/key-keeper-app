package io.hb3nce04.keykeeperapp.feature.assignment;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.request.AssignmentRequestDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.dto.response.AssignmentResponseDto;
import io.hb3nce04.keykeeperapp.feature.assignment.model.entity.Assignment;

@Mapper(config = BaseMapper.class)
public interface AssignmentMapper extends BaseMapper<AssignmentRequestDto, AssignmentResponseDto, Assignment> {
    @Mapping(source = "applicantId", target = "applicant.id")
    @Mapping(source = "keyId", target = "key.id")
    Assignment toEntity(AssignmentRequestDto dto);

    @Mapping(target = "applicant", ignore = true)
    @Mapping(target = "key", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateEntity(
            AssignmentRequestDto dto,
            @MappingTarget Assignment entity);
}

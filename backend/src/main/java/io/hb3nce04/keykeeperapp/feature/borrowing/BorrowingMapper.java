package io.hb3nce04.keykeeperapp.feature.borrowing;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import io.hb3nce04.keykeeperapp.common.mapper.BaseMapper;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.dto.request.BorrowingRequestDto;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.dto.response.BorrowingResponseDto;
import io.hb3nce04.keykeeperapp.feature.borrowing.model.entity.Borrowing;

@Mapper(config = BaseMapper.class)
public interface BorrowingMapper extends BaseMapper<BorrowingRequestDto, BorrowingResponseDto, Borrowing> {
    @Mapping(source = "requesterId", target = "requester.id")
    @Mapping(source = "keyId", target = "key.id")
    Borrowing toEntity(BorrowingRequestDto dto);

    @Mapping(target = "requester", ignore = true)
    @Mapping(target = "key", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateEntity(
            BorrowingRequestDto dto,
            @MappingTarget Borrowing entity);
}

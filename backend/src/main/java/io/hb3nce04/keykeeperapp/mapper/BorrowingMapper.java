package io.hb3nce04.keykeeperapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import io.hb3nce04.keykeeperapp.model.dto.BorrowingDto;
import io.hb3nce04.keykeeperapp.model.entity.Borrowing;

@Mapper(componentModel = "spring")
public interface BorrowingMapper {
    BorrowingDto toDTO(Borrowing borrowing);

    List<BorrowingDto> toDtoList(List<Borrowing> borrowings);
}

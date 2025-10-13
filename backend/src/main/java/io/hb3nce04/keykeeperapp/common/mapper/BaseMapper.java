package io.hb3nce04.keykeeperapp.common.mapper;

import java.util.List;

import org.mapstruct.MapperConfig;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import io.hb3nce04.keykeeperapp.common.model.dto.BaseDto;
import io.hb3nce04.keykeeperapp.common.model.entity.BaseEntity;

/**
 * Generikus MapStruct Mapper interfész request és response DTO-k, valamint entitások konvertálására.
 * @param <REQ> <REQ> Request DTO típus (klienstől érkező adatok)
 * @param <RES> Response DTO típus (BaseDto leszármazott, a szerver által visszaadott adatok)
 * @param <E> Entity típus (JPA entitás)
 */
@MapperConfig(componentModel = "spring")
public interface BaseMapper<REQ, RES extends BaseDto, E extends BaseEntity> {
    RES toDto(E entity);

    E toEntity(REQ dto);

    List<RES> toDtoList(List<E> entityList);

    @Mapping(target = "id", ignore = true)
    void updateEntity(
            REQ dto,
            @MappingTarget E entity);
}

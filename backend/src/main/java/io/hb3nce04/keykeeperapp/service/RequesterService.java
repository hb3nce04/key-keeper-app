package io.hb3nce04.keykeeperapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.mapper.RequesterMapper;
import io.hb3nce04.keykeeperapp.model.dto.RequesterDto;
import io.hb3nce04.keykeeperapp.repository.RequesterRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequesterService {
    private final RequesterMapper mapper;
    private final RequesterRepository repository;

    public List<RequesterDto> findAll() {
        return mapper.toDtoList(repository.findAll());
    }
}

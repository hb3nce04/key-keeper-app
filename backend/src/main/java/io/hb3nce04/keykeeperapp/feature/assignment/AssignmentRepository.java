package io.hb3nce04.keykeeperapp.feature.assignment;

import java.util.List;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.common.repository.BaseRepository;
import io.hb3nce04.keykeeperapp.feature.assignment.model.entity.Assignment;

@Repository
public interface AssignmentRepository extends BaseRepository<Assignment> {
    List<Assignment> findAllByUser_Id(Long userId);
}

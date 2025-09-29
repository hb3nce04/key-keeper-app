package io.hb3nce04.keykeeperapp.feature.requester;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.common.repository.BaseRepository;
import io.hb3nce04.keykeeperapp.feature.requester.model.entity.Requester;

@Repository
public interface RequesterRepository extends BaseRepository<Requester> {
}

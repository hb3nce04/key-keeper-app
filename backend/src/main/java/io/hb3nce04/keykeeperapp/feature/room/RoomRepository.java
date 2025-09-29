package io.hb3nce04.keykeeperapp.feature.room;

import org.springframework.stereotype.Repository;

import io.hb3nce04.keykeeperapp.common.repository.BaseRepository;
import io.hb3nce04.keykeeperapp.feature.room.model.entity.Room;

@Repository
public interface RoomRepository extends BaseRepository<Room> {
}

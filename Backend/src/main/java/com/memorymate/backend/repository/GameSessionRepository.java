package com.memorymate.backend.repository;

import com.memorymate.backend.model.GameSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameSessionRepository extends MongoRepository<GameSession, String> {
    List<GameSession> findByPatientIdOrderByStartedAtDesc(String patientId);
    List<GameSession> findByPatientIdAndGameTypeOrderByStartedAtDesc(String patientId, GameSession.GameType gameType);
    List<GameSession> findByPatientIdAndCompletedTrueOrderByCompletedAtDesc(String patientId);
}

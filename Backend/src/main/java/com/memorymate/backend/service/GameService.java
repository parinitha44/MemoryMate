package com.memorymate.backend.service;

import com.memorymate.backend.dto.GameSessionCompleteRequest;
import com.memorymate.backend.dto.GameSessionRequest;
import com.memorymate.backend.model.GameSession;
import com.memorymate.backend.repository.GameSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private ActivityLogService activityLogService;

    public GameSession startGameSession(String patientId, GameSessionRequest request) {
        GameSession gameSession = new GameSession(patientId, request.getGameType(), request.getDifficultyLevel());
        gameSession.setMaxScore(request.getMaxScore());
        return gameSessionRepository.save(gameSession);
    }

    public GameSession completeGameSession(String gameSessionId, String patientId, GameSessionCompleteRequest request) {
        GameSession gameSession = gameSessionRepository.findById(gameSessionId)
                .orElseThrow(() -> new RuntimeException("Game session not found"));

        if (!gameSession.getPatientId().equals(patientId)) {
            throw new RuntimeException("Access denied");
        }

        gameSession.setScore(request.getScore());
        gameSession.setDurationSeconds(request.getDurationSeconds());
        gameSession.setMovesCount(request.getMovesCount());
        gameSession.setCompleted(true);
        gameSession.setCompletedAt(LocalDateTime.now());

        // Create activity log
        activityLogService.createGameActivityLog(patientId, gameSession.getGameType().name(), 
                                               request.getScore(), gameSession.getMaxScore());

        return gameSessionRepository.save(gameSession);
    }

    public List<GameSession> getGameSessionsForPatient(String patientId) {
        return gameSessionRepository.findByPatientIdOrderByStartedAtDesc(patientId);
    }

    public List<GameSession> getCompletedGameSessionsForPatient(String patientId) {
        return gameSessionRepository.findByPatientIdAndCompletedTrueOrderByCompletedAtDesc(patientId);
    }

    public List<GameSession> getGameSessionsByType(String patientId, GameSession.GameType gameType) {
        return gameSessionRepository.findByPatientIdAndGameTypeOrderByStartedAtDesc(patientId, gameType);
    }

    public GameSession getGameSessionById(String gameSessionId, String patientId) {
        GameSession gameSession = gameSessionRepository.findById(gameSessionId)
                .orElseThrow(() -> new RuntimeException("Game session not found"));

        if (!gameSession.getPatientId().equals(patientId)) {
            throw new RuntimeException("Access denied");
        }

        return gameSession;
    }
}

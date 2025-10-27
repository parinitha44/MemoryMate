package com.memorymate.backend.dto;

import com.memorymate.backend.model.GameSession;
import jakarta.validation.constraints.NotNull;

public class GameSessionRequest {
    @NotNull(message = "Game type is required")
    private GameSession.GameType gameType;
    
    private GameSession.DifficultyLevel difficultyLevel = GameSession.DifficultyLevel.EASY;
    
    private int maxScore = 0;

    public GameSessionRequest() {}

    public GameSessionRequest(GameSession.GameType gameType, GameSession.DifficultyLevel difficultyLevel) {
        this.gameType = gameType;
        this.difficultyLevel = difficultyLevel;
    }

    public GameSession.GameType getGameType() {
        return gameType;
    }

    public void setGameType(GameSession.GameType gameType) {
        this.gameType = gameType;
    }

    public GameSession.DifficultyLevel getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(GameSession.DifficultyLevel difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
    }
}

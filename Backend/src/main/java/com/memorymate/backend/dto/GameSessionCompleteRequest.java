package com.memorymate.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class GameSessionCompleteRequest {
    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score must be non-negative")
    private int score;
    
    @NotNull(message = "Duration is required")
    @Min(value = 0, message = "Duration must be non-negative")
    private int durationSeconds;
    
    @NotNull(message = "Moves count is required")
    @Min(value = 0, message = "Moves count must be non-negative")
    private int movesCount;

    public GameSessionCompleteRequest() {}

    public GameSessionCompleteRequest(int score, int durationSeconds, int movesCount) {
        this.score = score;
        this.durationSeconds = durationSeconds;
        this.movesCount = movesCount;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getDurationSeconds() {
        return durationSeconds;
    }

    public void setDurationSeconds(int durationSeconds) {
        this.durationSeconds = durationSeconds;
    }

    public int getMovesCount() {
        return movesCount;
    }

    public void setMovesCount(int movesCount) {
        this.movesCount = movesCount;
    }
}

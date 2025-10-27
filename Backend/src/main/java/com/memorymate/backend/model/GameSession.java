package com.memorymate.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "game_sessions")
public class GameSession {
    @Id
    private String id;
    
    @Field("patient_id")
    private String patientId;
    
    @Field("game_type")
    private GameType gameType;
    
    private int score;
    
    @Field("max_score")
    private int maxScore;
    
    @Field("duration_seconds")
    private int durationSeconds;
    
    @Field("moves_count")
    private int movesCount;
    
    @Field("difficulty_level")
    private DifficultyLevel difficultyLevel;
    
    private boolean completed;
    
    @Field("started_at")
    private LocalDateTime startedAt;
    
    @Field("completed_at")
    private LocalDateTime completedAt;

    public GameSession() {
        this.startedAt = LocalDateTime.now();
        this.completed = false;
    }

    public GameSession(String patientId, GameType gameType, DifficultyLevel difficultyLevel) {
        this();
        this.patientId = patientId;
        this.gameType = gameType;
        this.difficultyLevel = difficultyLevel;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public GameType getGameType() {
        return gameType;
    }

    public void setGameType(GameType gameType) {
        this.gameType = gameType;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
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

    public DifficultyLevel getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(DifficultyLevel difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public enum GameType {
        MEMORY_MATCH,
        WORD_RECALL,
        PATTERN_FINDER
    }

    public enum DifficultyLevel {
        EASY,
        MEDIUM,
        HARD
    }
}

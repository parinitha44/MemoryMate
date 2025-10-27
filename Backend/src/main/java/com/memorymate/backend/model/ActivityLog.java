package com.memorymate.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "activity_logs")
public class ActivityLog {
    @Id
    private String id;
    
    @Field("patient_id")
    private String patientId;
    
    @Field("activity_type")
    private ActivityType activityType;
    
    private String description;
    private String metadata;
    
    private LocalDateTime timestamp;

    public ActivityLog() {
        this.timestamp = LocalDateTime.now();
    }

    public ActivityLog(String patientId, ActivityType activityType, String description) {
        this();
        this.patientId = patientId;
        this.activityType = activityType;
        this.description = description;
    }

    public ActivityLog(String patientId, ActivityType activityType, String description, String metadata) {
        this(patientId, activityType, description);
        this.metadata = metadata;
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

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public enum ActivityType {
        GAME_PLAYED,
        REMINDER_COMPLETED,
        FACE_RECOGNITION,
        JOURNAL_ENTRY,
        MEDICATION_TAKEN,
        EXERCISE_COMPLETED,
        CONVERSATION_LOG,
        OTHER
    }
}

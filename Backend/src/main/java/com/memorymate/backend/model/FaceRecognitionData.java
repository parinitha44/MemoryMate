package com.memorymate.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "face_recognition_data")
public class FaceRecognitionData {
    @Id
    private String id;
    
    @Field("patient_id")
    private String patientId;
    
    @Field("person_name")
    private String personName;
    
    @Field("face_encoding")
    private String faceEncoding;
    
    @Field("confidence_score")
    private double confidenceScore;
    
    @Field("image_path")
    private String imagePath;
    
    @Field("last_seen")
    private LocalDateTime lastSeen;
    
    @Field("created_at")
    private LocalDateTime createdAt;

    public FaceRecognitionData() {
        this.createdAt = LocalDateTime.now();
        this.lastSeen = LocalDateTime.now();
    }

    public FaceRecognitionData(String patientId, String personName, String faceEncoding) {
        this();
        this.patientId = patientId;
        this.personName = personName;
        this.faceEncoding = faceEncoding;
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

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getFaceEncoding() {
        return faceEncoding;
    }

    public void setFaceEncoding(String faceEncoding) {
        this.faceEncoding = faceEncoding;
    }

    public double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public LocalDateTime getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(LocalDateTime lastSeen) {
        this.lastSeen = lastSeen;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

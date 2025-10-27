package com.memorymate.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "journal_entries")
public class JournalEntry {
    @Id
    private String id;
    
    @Field("patient_id")
    private String patientId;
    
    private String title;
    private String content;
    
    private Mood mood;
    
    @Field("entry_date")
    private LocalDate entryDate;
    
    @Field("created_at")
    private LocalDateTime createdAt;

    public JournalEntry() {
        this.createdAt = LocalDateTime.now();
        this.entryDate = LocalDate.now();
    }

    public JournalEntry(String patientId, String title, String content, Mood mood) {
        this();
        this.patientId = patientId;
        this.title = title;
        this.content = content;
        this.mood = mood;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Mood getMood() {
        return mood;
    }

    public void setMood(Mood mood) {
        this.mood = mood;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public enum Mood {
        VERY_HAPPY,
        HAPPY,
        NEUTRAL,
        SAD,
        VERY_SAD,
        ANXIOUS,
        CALM,
        EXCITED,
        TIRED,
        FRUSTRATED
    }
}

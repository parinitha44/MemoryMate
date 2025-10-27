package com.memorymate.backend.dto;

import com.memorymate.backend.model.JournalEntry;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class JournalEntryRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    @NotNull(message = "Mood is required")
    private JournalEntry.Mood mood;
    
    private LocalDate entryDate;

    public JournalEntryRequest() {
        this.entryDate = LocalDate.now();
    }

    public JournalEntryRequest(String title, String content, JournalEntry.Mood mood) {
        this();
        this.title = title;
        this.content = content;
        this.mood = mood;
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

    public JournalEntry.Mood getMood() {
        return mood;
    }

    public void setMood(JournalEntry.Mood mood) {
        this.mood = mood;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }
}

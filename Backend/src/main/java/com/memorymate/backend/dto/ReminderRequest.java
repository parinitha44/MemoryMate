package com.memorymate.backend.dto;

import com.memorymate.backend.model.Reminder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;

public class ReminderRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Reminder time is required")
    private ZonedDateTime reminderTime;
    
    private Reminder.Priority priority = Reminder.Priority.MEDIUM;
    
    private boolean isRecurring = false;
    
    private String recurrencePattern;

    public ReminderRequest() {}

    public ReminderRequest(String title, String description, ZonedDateTime reminderTime, Reminder.Priority priority) {
        this.title = title;
        this.description = description;
        this.reminderTime = reminderTime;
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getReminderTime() {
        return reminderTime;
    }

    public void setReminderTime(ZonedDateTime reminderTime) {
        this.reminderTime = reminderTime;
    }

    public Reminder.Priority getPriority() {
        return priority;
    }

    public void setPriority(Reminder.Priority priority) {
        this.priority = priority;
    }

    public boolean isRecurring() {
        return isRecurring;
    }

    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }

    public String getRecurrencePattern() {
        return recurrencePattern;
    }

    public void setRecurrencePattern(String recurrencePattern) {
        this.recurrencePattern = recurrencePattern;
    }
}

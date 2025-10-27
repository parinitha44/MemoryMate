package com.memorymate.backend.service;

import com.memorymate.backend.dto.ReminderRequest;
import com.memorymate.backend.model.Reminder;
import com.memorymate.backend.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    public List<Reminder> getRemindersForPatient(String patientId) {
        return reminderRepository.findByPatientIdOrderByReminderTimeAsc(patientId);
    }

    public List<Reminder> getPendingRemindersForPatient(String patientId) {
        return reminderRepository.findByPatientIdAndStatus(patientId, Reminder.ReminderStatus.PENDING);
    }

    public Reminder createReminder(String patientId, ReminderRequest request) {
        Reminder reminder = new Reminder();
        reminder.setPatientId(patientId);
        reminder.setTitle(request.getTitle());
        reminder.setDescription(request.getDescription());
        reminder.setReminderTime(request.getReminderTime());
        reminder.setPriority(request.getPriority());
        reminder.setRecurring(request.isRecurring());
        reminder.setRecurrencePattern(request.getRecurrencePattern());
        
        return reminderRepository.save(reminder);
    }

    public Reminder completeReminder(String reminderId, String patientId) {
        Reminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        if (!reminder.getPatientId().equals(patientId)) {
            throw new RuntimeException("Access denied");
        }

        reminder.setStatus(Reminder.ReminderStatus.COMPLETED);
        reminder.setUpdatedAt(java.time.LocalDateTime.now());
        
        return reminderRepository.save(reminder);
    }

    public Reminder getReminderById(String reminderId, String patientId) {
        Reminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        if (!reminder.getPatientId().equals(patientId)) {
            throw new RuntimeException("Access denied");
        }

        return reminder;
    }
}

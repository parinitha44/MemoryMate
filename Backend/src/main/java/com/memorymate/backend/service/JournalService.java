package com.memorymate.backend.service;

import com.memorymate.backend.dto.JournalEntryRequest;
import com.memorymate.backend.model.JournalEntry;
import com.memorymate.backend.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JournalService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private ActivityLogService activityLogService;

    public List<JournalEntry> getJournalEntriesForPatient(String patientId) {
        return journalEntryRepository.findByPatientIdOrderByEntryDateDesc(patientId);
    }

    public List<JournalEntry> getJournalEntriesByDateRange(String patientId, LocalDate startDate, LocalDate endDate) {
        return journalEntryRepository.findByPatientIdAndEntryDateBetweenOrderByEntryDateDesc(patientId, startDate, endDate);
    }

    public List<JournalEntry> getJournalEntriesByMood(String patientId, JournalEntry.Mood mood) {
        return journalEntryRepository.findByPatientIdAndMoodOrderByEntryDateDesc(patientId, mood);
    }

    public JournalEntry createJournalEntry(String patientId, JournalEntryRequest request) {
        JournalEntry journalEntry = new JournalEntry();
        journalEntry.setPatientId(patientId);
        journalEntry.setTitle(request.getTitle());
        journalEntry.setContent(request.getContent());
        journalEntry.setMood(request.getMood());
        journalEntry.setEntryDate(request.getEntryDate());

        JournalEntry savedEntry = journalEntryRepository.save(journalEntry);

        // Create activity log
        activityLogService.createActivityLog(patientId, 
            com.memorymate.backend.model.ActivityLog.ActivityType.JOURNAL_ENTRY, 
            "Created journal entry: " + request.getTitle());

        return savedEntry;
    }

    public JournalEntry getJournalEntryById(String journalEntryId, String patientId) {
        JournalEntry journalEntry = journalEntryRepository.findById(journalEntryId)
                .orElseThrow(() -> new RuntimeException("Journal entry not found"));

        if (!journalEntry.getPatientId().equals(patientId)) {
            throw new RuntimeException("Access denied");
        }

        return journalEntry;
    }

    public JournalEntry updateJournalEntry(String journalEntryId, String patientId, JournalEntryRequest request) {
        JournalEntry journalEntry = getJournalEntryById(journalEntryId, patientId);
        
        journalEntry.setTitle(request.getTitle());
        journalEntry.setContent(request.getContent());
        journalEntry.setMood(request.getMood());
        journalEntry.setEntryDate(request.getEntryDate());

        return journalEntryRepository.save(journalEntry);
    }

    public void deleteJournalEntry(String journalEntryId, String patientId) {
        JournalEntry journalEntry = getJournalEntryById(journalEntryId, patientId);
        journalEntryRepository.delete(journalEntry);
    }

    public JournalStats getJournalStats(String patientId) {
        List<JournalEntry> allEntries = getJournalEntriesForPatient(patientId);
        
        JournalStats stats = new JournalStats();
        stats.setTotalEntries(allEntries.size());
        
        // Count entries by mood
        long happyEntries = allEntries.stream()
                .filter(entry -> entry.getMood() == JournalEntry.Mood.HAPPY || 
                               entry.getMood() == JournalEntry.Mood.VERY_HAPPY)
                .count();
        stats.setHappyEntries((int) happyEntries);
        
        long sadEntries = allEntries.stream()
                .filter(entry -> entry.getMood() == JournalEntry.Mood.SAD || 
                               entry.getMood() == JournalEntry.Mood.VERY_SAD)
                .count();
        stats.setSadEntries((int) sadEntries);
        
        // Calculate average mood score (simplified)
        double avgMoodScore = allEntries.stream()
                .mapToDouble(entry -> getMoodScore(entry.getMood()))
                .average()
                .orElse(0.0);
        stats.setAverageMoodScore(avgMoodScore);
        
        return stats;
    }

    private double getMoodScore(JournalEntry.Mood mood) {
        return switch (mood) {
            case VERY_HAPPY -> 5.0;
            case HAPPY -> 4.0;
            case NEUTRAL -> 3.0;
            case SAD -> 2.0;
            case VERY_SAD -> 1.0;
            case ANXIOUS -> 2.5;
            case CALM -> 4.5;
            case EXCITED -> 4.5;
            case TIRED -> 2.0;
            case FRUSTRATED -> 1.5;
        };
    }

    public static class JournalStats {
        private int totalEntries;
        private int happyEntries;
        private int sadEntries;
        private double averageMoodScore;

        // Getters and Setters
        public int getTotalEntries() { return totalEntries; }
        public void setTotalEntries(int totalEntries) { this.totalEntries = totalEntries; }
        
        public int getHappyEntries() { return happyEntries; }
        public void setHappyEntries(int happyEntries) { this.happyEntries = happyEntries; }
        
        public int getSadEntries() { return sadEntries; }
        public void setSadEntries(int sadEntries) { this.sadEntries = sadEntries; }
        
        public double getAverageMoodScore() { return averageMoodScore; }
        public void setAverageMoodScore(double averageMoodScore) { this.averageMoodScore = averageMoodScore; }
    }
}

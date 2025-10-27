package com.memorymate.backend.repository;

import com.memorymate.backend.model.JournalEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface JournalEntryRepository extends MongoRepository<JournalEntry, String> {
    List<JournalEntry> findByPatientIdOrderByEntryDateDesc(String patientId);
    List<JournalEntry> findByPatientIdAndEntryDateBetweenOrderByEntryDateDesc(String patientId, LocalDate startDate, LocalDate endDate);
    List<JournalEntry> findByPatientIdAndMoodOrderByEntryDateDesc(String patientId, JournalEntry.Mood mood);
}

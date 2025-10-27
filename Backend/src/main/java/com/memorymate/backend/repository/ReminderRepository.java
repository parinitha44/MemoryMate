package com.memorymate.backend.repository;

import com.memorymate.backend.model.Reminder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReminderRepository extends MongoRepository<Reminder, String> {
    List<Reminder> findByPatientId(String patientId);
    List<Reminder> findByPatientIdAndStatus(String patientId, Reminder.ReminderStatus status);
    List<Reminder> findByPatientIdOrderByReminderTimeAsc(String patientId);
}

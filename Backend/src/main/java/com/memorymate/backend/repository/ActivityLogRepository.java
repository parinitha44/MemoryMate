package com.memorymate.backend.repository;

import com.memorymate.backend.model.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    List<ActivityLog> findByPatientIdOrderByTimestampDesc(String patientId);
    List<ActivityLog> findByPatientIdAndActivityTypeOrderByTimestampDesc(String patientId, ActivityLog.ActivityType activityType);
}

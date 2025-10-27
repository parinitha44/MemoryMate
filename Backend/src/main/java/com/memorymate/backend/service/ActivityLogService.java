package com.memorymate.backend.service;

import com.memorymate.backend.model.ActivityLog;
import com.memorymate.backend.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public List<ActivityLog> getActivityLogsForPatient(String patientId) {
        return activityLogRepository.findByPatientIdOrderByTimestampDesc(patientId);
    }

    public List<ActivityLog> getActivityLogsByType(String patientId, ActivityLog.ActivityType activityType) {
        return activityLogRepository.findByPatientIdAndActivityTypeOrderByTimestampDesc(patientId, activityType);
    }

    public ActivityLog createActivityLog(String patientId, ActivityLog.ActivityType activityType, String description) {
        ActivityLog activityLog = new ActivityLog(patientId, activityType, description);
        return activityLogRepository.save(activityLog);
    }

    public ActivityLog createActivityLog(String patientId, ActivityLog.ActivityType activityType, String description, String metadata) {
        ActivityLog activityLog = new ActivityLog(patientId, activityType, description, metadata);
        return activityLogRepository.save(activityLog);
    }

    public ActivityLog createGameActivityLog(String patientId, String gameType, int score, int maxScore) {
        String description = String.format("Played %s game with score %d/%d", gameType, score, maxScore);
        String metadata = String.format("{\"gameType\":\"%s\",\"score\":%d,\"maxScore\":%d}", gameType, score, maxScore);
        return createActivityLog(patientId, ActivityLog.ActivityType.GAME_PLAYED, description, metadata);
    }
}

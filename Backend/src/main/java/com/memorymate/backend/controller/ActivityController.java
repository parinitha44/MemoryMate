package com.memorymate.backend.controller;

import com.memorymate.backend.model.ActivityLog;
import com.memorymate.backend.model.User;
import com.memorymate.backend.service.ActivityLogService;
import com.memorymate.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    @Autowired
    private ActivityLogService activityLogService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<ActivityLog>> getActivities(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            List<ActivityLog> activities = activityLogService.getActivityLogsForPatient(user.getId());
            return ResponseEntity.ok(activities);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<ActivityLog> createActivity(
            Authentication authentication,
            @RequestParam String activityType,
            @RequestParam String description,
            @RequestParam(required = false) String metadata) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            ActivityLog.ActivityType type = ActivityLog.ActivityType.valueOf(activityType.toUpperCase());
            ActivityLog activity = activityLogService.createActivityLog(user.getId(), type, description, metadata);
            return ResponseEntity.ok(activity);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/game")
    public ResponseEntity<ActivityLog> createGameActivity(
            Authentication authentication,
            @RequestParam String gameType,
            @RequestParam int score,
            @RequestParam int maxScore) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            ActivityLog activity = activityLogService.createGameActivityLog(user.getId(), gameType, score, maxScore);
            return ResponseEntity.ok(activity);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

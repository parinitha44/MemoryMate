package com.memorymate.backend.controller;

import com.memorymate.backend.dto.ReminderRequest;
import com.memorymate.backend.model.Reminder;
import com.memorymate.backend.model.User;
import com.memorymate.backend.service.ReminderService;
import com.memorymate.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@CrossOrigin(origins = "*")
public class ReminderController {

    @Autowired
    private ReminderService reminderService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Reminder>> getReminders(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            List<Reminder> reminders = reminderService.getRemindersForPatient(user.getId());
            return ResponseEntity.ok(reminders);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Reminder>> getPendingReminders(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            List<Reminder> reminders = reminderService.getPendingRemindersForPatient(user.getId());
            return ResponseEntity.ok(reminders);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Reminder> createReminder(
            Authentication authentication,
            @Valid @RequestBody ReminderRequest request) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            Reminder reminder = reminderService.createReminder(user.getId(), request);
            return ResponseEntity.ok(reminder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Reminder> completeReminder(
            Authentication authentication,
            @PathVariable String id) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            Reminder reminder = reminderService.completeReminder(id, user.getId());
            return ResponseEntity.ok(reminder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

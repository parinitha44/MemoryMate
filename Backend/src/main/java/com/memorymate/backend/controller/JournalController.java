package com.memorymate.backend.controller;

import com.memorymate.backend.dto.JournalEntryRequest;
import com.memorymate.backend.model.JournalEntry;
import com.memorymate.backend.model.User;
import com.memorymate.backend.service.JournalService;
import com.memorymate.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<JournalEntry>> getJournalEntries(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            List<JournalEntry> entries = journalService.getJournalEntriesForPatient(user.getId());
            return ResponseEntity.ok(entries);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<JournalEntry> createJournalEntry(
            Authentication authentication,
            @Valid @RequestBody JournalEntryRequest request) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            JournalEntry entry = journalService.createJournalEntry(user.getId(), request);
            return ResponseEntity.ok(entry);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<JournalService.JournalStats> getJournalStats(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            JournalService.JournalStats stats = journalService.getJournalStats(user.getId());
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/by-date-range")
    public ResponseEntity<List<JournalEntry>> getJournalEntriesByDateRange(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            List<JournalEntry> entries = journalService.getJournalEntriesByDateRange(user.getId(), startDate, endDate);
            return ResponseEntity.ok(entries);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/by-mood")
    public ResponseEntity<List<JournalEntry>> getJournalEntriesByMood(
            Authentication authentication,
            @RequestParam String mood) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            JournalEntry.Mood moodEnum = JournalEntry.Mood.valueOf(mood.toUpperCase());
            List<JournalEntry> entries = journalService.getJournalEntriesByMood(user.getId(), moodEnum);
            return ResponseEntity.ok(entries);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

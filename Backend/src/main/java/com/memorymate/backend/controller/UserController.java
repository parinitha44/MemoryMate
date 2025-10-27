package com.memorymate.backend.controller;

import com.memorymate.backend.model.User;
import com.memorymate.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            Authentication authentication,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String caregiverEmail) {
        try {
            String email = authentication.getName();
            User user = userService.updateProfile(email, fullName, caregiverEmail);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/patients")
    public ResponseEntity<?> getPatients(Authentication authentication) {
        // This would require additional logic to get patients for a caregiver
        // For now, return empty list
        return ResponseEntity.ok().body("[]");
    }
}

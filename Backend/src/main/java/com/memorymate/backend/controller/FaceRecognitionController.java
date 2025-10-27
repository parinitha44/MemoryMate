package com.memorymate.backend.controller;

import com.memorymate.backend.model.FaceRecognitionData;
import com.memorymate.backend.model.User;
import com.memorymate.backend.service.FaceRecognitionService;
import com.memorymate.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/face-recognition")
@CrossOrigin(origins = "*")
public class FaceRecognitionController {

    @Autowired
    private FaceRecognitionService faceRecognitionService;

    @Autowired
    private UserService userService;

    @PostMapping("/add-person")
    public ResponseEntity<FaceRecognitionData> addPerson(
            Authentication authentication,
            @RequestParam("personName") String personName,
            @RequestParam("image") MultipartFile imageFile) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            FaceRecognitionData faceData = faceRecognitionService.addPerson(user.getId(), personName, imageFile);
            return ResponseEntity.ok(faceData);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/recognize")
    public ResponseEntity<FaceRecognitionData> recognizePerson(
            Authentication authentication,
            @RequestParam("image") MultipartFile imageFile) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            FaceRecognitionData faceData = faceRecognitionService.recognizePerson(user.getId(), imageFile);
            return ResponseEntity.ok(faceData);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/people")
    public ResponseEntity<List<FaceRecognitionData>> getPeople(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            List<FaceRecognitionData> people = faceRecognitionService.getPeopleForPatient(user.getId());
            return ResponseEntity.ok(people);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

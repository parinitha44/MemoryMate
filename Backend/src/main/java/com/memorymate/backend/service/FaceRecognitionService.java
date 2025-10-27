package com.memorymate.backend.service;

import com.memorymate.backend.model.FaceRecognitionData;
import com.memorymate.backend.repository.FaceRecognitionDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FaceRecognitionService {

    @Autowired
    private FaceRecognitionDataRepository faceRecognitionDataRepository;

    @Autowired
    private ActivityLogService activityLogService;

    private static final String UPLOAD_DIR = "uploads/faces/";

    public FaceRecognitionData addPerson(String patientId, String personName, MultipartFile imageFile) {
        try {
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR + patientId);
            Files.createDirectories(uploadPath);

            // Generate unique filename
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Save file
            Files.copy(imageFile.getInputStream(), filePath);

            // Convert image to base64 for storage (simplified approach)
            String faceEncoding = Base64.getEncoder().encodeToString(imageFile.getBytes());

            // Create face recognition data
            FaceRecognitionData faceData = new FaceRecognitionData(patientId, personName, faceEncoding);
            faceData.setImagePath(filePath.toString());
            faceData.setConfidenceScore(0.0); // Will be updated during recognition

            FaceRecognitionData savedData = faceRecognitionDataRepository.save(faceData);

            // Create activity log
            activityLogService.createActivityLog(patientId, 
                com.memorymate.backend.model.ActivityLog.ActivityType.FACE_RECOGNITION, 
                "Added person: " + personName);

            return savedData;

        } catch (IOException e) {
            throw new RuntimeException("Failed to save image file", e);
        }
    }

    public FaceRecognitionData recognizePerson(String patientId, MultipartFile imageFile) {
        try {
            // Convert image to base64 for comparison (simplified approach)
            String imageEncoding = Base64.getEncoder().encodeToString(imageFile.getBytes());

            // Get all face data for the patient
            List<FaceRecognitionData> allFaces = faceRecognitionDataRepository.findByPatientIdOrderByLastSeenDesc(patientId);

            // Simple matching logic (in real implementation, use proper face recognition algorithms)
            FaceRecognitionData bestMatch = null;
            double bestScore = 0.0;

            for (FaceRecognitionData faceData : allFaces) {
                // Simple string similarity (replace with actual face recognition)
                double similarity = calculateSimilarity(imageEncoding, faceData.getFaceEncoding());
                if (similarity > bestScore && similarity > 0.7) { // Threshold for recognition
                    bestScore = similarity;
                    bestMatch = faceData;
                }
            }

            if (bestMatch != null) {
                // Update last seen
                bestMatch.setLastSeen(java.time.LocalDateTime.now());
                bestMatch.setConfidenceScore(bestScore);
                faceRecognitionDataRepository.save(bestMatch);

                // Create activity log
                activityLogService.createActivityLog(patientId, 
                    com.memorymate.backend.model.ActivityLog.ActivityType.FACE_RECOGNITION, 
                    "Recognized person: " + bestMatch.getPersonName());
            }

            return bestMatch;

        } catch (IOException e) {
            throw new RuntimeException("Failed to process image file", e);
        }
    }

    public List<FaceRecognitionData> getPeopleForPatient(String patientId) {
        return faceRecognitionDataRepository.findByPatientIdOrderByLastSeenDesc(patientId);
    }

    public Optional<FaceRecognitionData> getPersonByName(String patientId, String personName) {
        return faceRecognitionDataRepository.findByPatientIdAndPersonName(patientId, personName);
    }

    private double calculateSimilarity(String encoding1, String encoding2) {
        // Simple similarity calculation (replace with proper face recognition)
        if (encoding1.equals(encoding2)) {
            return 1.0;
        }
        // For demo purposes, return a random similarity score
        return Math.random() * 0.5;
    }
}

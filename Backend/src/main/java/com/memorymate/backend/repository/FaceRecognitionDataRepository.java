package com.memorymate.backend.repository;

import com.memorymate.backend.model.FaceRecognitionData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FaceRecognitionDataRepository extends MongoRepository<FaceRecognitionData, String> {
    List<FaceRecognitionData> findByPatientIdOrderByLastSeenDesc(String patientId);
    Optional<FaceRecognitionData> findByPatientIdAndPersonName(String patientId, String personName);
}

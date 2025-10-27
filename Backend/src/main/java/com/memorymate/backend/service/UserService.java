package com.memorymate.backend.service;

import com.memorymate.backend.dto.AuthResponse;
import com.memorymate.backend.dto.SignupRequest;
import com.memorymate.backend.model.User;
import com.memorymate.backend.repository.UserRepository;
import com.memorymate.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse signup(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFullName(signupRequest.getFullName());
        user.setEmail(signupRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRoles(Set.of(signupRequest.getRole()));
        user.setCaregiverEmail(signupRequest.getCaregiverEmail());

        User savedUser = userRepository.save(user);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", savedUser.getId());
        claims.put("roles", savedUser.getRoles());

        String token = jwtUtil.generateToken(savedUser.getEmail(), claims);

        return new AuthResponse(token, savedUser.getId(), savedUser.getFullName(), 
                              savedUser.getEmail(), savedUser.getRoles());
    }

    public AuthResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Account is deactivated");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("roles", user.getRoles());

        String token = jwtUtil.generateToken(user.getEmail(), claims);

        return new AuthResponse(token, user.getId(), user.getFullName(), 
                              user.getEmail(), user.getRoles());
    }

    public User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, String fullName, String caregiverEmail) {
        User user = getCurrentUser(email);
        user.setFullName(fullName);
        user.setCaregiverEmail(caregiverEmail);
        user.setUpdatedAt(java.time.LocalDateTime.now());
        return userRepository.save(user);
    }
}

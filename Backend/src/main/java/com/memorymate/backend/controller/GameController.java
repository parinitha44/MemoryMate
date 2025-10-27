package com.memorymate.backend.controller;

import com.memorymate.backend.dto.GameSessionCompleteRequest;
import com.memorymate.backend.dto.GameSessionRequest;
import com.memorymate.backend.model.GameSession;
import com.memorymate.backend.model.User;
import com.memorymate.backend.service.GameService;
import com.memorymate.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private UserService userService;

    @PostMapping("/start")
    public ResponseEntity<GameSession> startGame(
            Authentication authentication,
            @Valid @RequestBody GameSessionRequest request) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            GameSession gameSession = gameService.startGameSession(user.getId(), request);
            return ResponseEntity.ok(gameSession);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<GameSession> completeGame(
            Authentication authentication,
            @PathVariable String id,
            @Valid @RequestBody GameSessionCompleteRequest request) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            GameSession gameSession = gameService.completeGameSession(id, user.getId(), request);
            return ResponseEntity.ok(gameSession);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/sessions")
    public ResponseEntity<List<GameSession>> getGameSessions(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getCurrentUser(email);
            List<GameSession> sessions = gameService.getGameSessionsForPatient(user.getId());
            return ResponseEntity.ok(sessions);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

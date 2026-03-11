package com.cineplanet.backend.controller;

import com.cineplanet.backend.config.JwtUtil;
import com.cineplanet.backend.model.dto.AuthRequest;
import com.cineplanet.backend.model.dto.AuthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="Auth")
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Operation(summary = "Login y JWT")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        log.info("AuthController login - email: {}", request.getEmail());

        if(request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String token = jwtUtil.generateToken(request.getEmail());
        log.info("AuthController login - Token generado para: {}", request.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, request.getEmail()));
    }
}

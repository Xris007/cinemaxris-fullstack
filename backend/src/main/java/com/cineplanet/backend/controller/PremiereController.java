package com.cineplanet.backend.controller;

import com.cineplanet.backend.model.dto.PremiereDTO;
import com.cineplanet.backend.service.PremiereService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Premieres")
@RestController
@RequestMapping("/api/premieres")
@CrossOrigin(origins = "*")
public class PremiereController {

    private static final Logger log = LoggerFactory.getLogger(PremiereController.class);
    private final PremiereService premiereService;

    public PremiereController(PremiereService premiereService) {
        this.premiereService = premiereService;
    }

    @Operation(summary = "Obtener todas las películas en cartelera")
    @GetMapping
    public ResponseEntity<List<PremiereDTO>> getAll() {
        log.info("GET /api/premieres");
        return ResponseEntity.ok(premiereService.getAll());
    }
}
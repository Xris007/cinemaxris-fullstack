package com.cineplanet.backend.controller;

import com.cineplanet.backend.model.dto.CompleteRequest;
import com.cineplanet.backend.model.dto.CompleteResponse;
import com.cineplanet.backend.service.CompleteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Complete", description = "Completar transacción de pago")
@RestController
@RequestMapping("/api/complete")
@CrossOrigin(origins = "*")
public class CompleteController {

    private static final Logger log = LoggerFactory.getLogger(CompleteController.class);
    private final CompleteService completeService;

    public CompleteController(CompleteService completeService) {
        this.completeService = completeService;
    }

    @Operation(summary = "Completar transacción luego del pago con PayU")
    @PostMapping
    public ResponseEntity<CompleteResponse> complete(@RequestBody CompleteRequest request) {
        log.info("POST /api/complete - email: {}", request.getEmail());
        return ResponseEntity.ok(completeService.complete(request));
    }
}

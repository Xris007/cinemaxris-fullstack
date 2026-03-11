package com.cineplanet.backend.controller;

import com.cineplanet.backend.model.dto.CandyStoreItemDTO;
import com.cineplanet.backend.service.CandyStoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Candystore", description = "Productos de dulcería")
@RestController
@RequestMapping("/api/candystore")
@CrossOrigin(origins = "*")
public class CandyStoreController {
    private static final Logger log = LoggerFactory.getLogger(CandyStoreController.class.getName());
    private final CandyStoreService candyStoreService;

    public CandyStoreController(CandyStoreService candyStoreService){
        this.candyStoreService = candyStoreService;
    }

    @Operation(summary = "Obtener todos los productos de dulcería")
    @GetMapping
    public ResponseEntity<List<CandyStoreItemDTO>> getAll(){
        log.info("GET /api/candystore");
        return ResponseEntity.ok(candyStoreService.getAll());
    }
}

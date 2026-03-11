package com.cineplanet.backend.service;

import com.cineplanet.backend.model.Premiere;
import com.cineplanet.backend.model.dto.PremiereDTO;
import com.cineplanet.backend.repository.PremiereRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PremiereService {

    private static final Logger log = LoggerFactory.getLogger(PremiereService.class);
    private final PremiereRepository premiereRepository;

    public PremiereService(PremiereRepository premiereRepository) {
        this.premiereRepository = premiereRepository;
    }

    @Transactional
    public List<PremiereDTO> getAll() {
        try {
            log.info("PremiereService -> sp_web_get_premieres");
            List<PremiereDTO> premieres = premiereRepository.findAll()
                    .stream()
                    .map(p -> toDTO(p))
                    .collect(Collectors.toList());
            log.info("{} cantidad premieres ", premieres.size());
            return premieres;
        } catch (Exception e) {
            log.error("Error al obtener premieres: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private PremiereDTO toDTO(Premiere premiere) {
        PremiereDTO dto = new PremiereDTO();
        dto.setId(premiere.getId());
        dto.setTitle(premiere.getTitle());
        dto.setDescription(premiere.getDescription());
        dto.setImageUrl(premiere.getImageUrl());
        dto.setGenre(premiere.getGenre());
        dto.setDuration(premiere.getDuration());
        dto.setRating(premiere.getRating());
        return dto;
    }
}

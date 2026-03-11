package com.cineplanet.backend.service;

import com.cineplanet.backend.model.Premiere;
import com.cineplanet.backend.model.dto.PremiereDTO;
import com.cineplanet.backend.repository.PremiereRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PremiereService {

    private static final Logger log = LoggerFactory.getLogger(PremiereService.class.getName());
    private final PremiereRepository premiereRepository;

    public PremiereService(PremiereRepository premiereRepository) {
        this.premiereRepository = premiereRepository;
    }

    public List<PremiereDTO> getAll(){
        try {
            log.info("PremiereService getAll()");
            return premiereRepository.findAll()
                    .stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
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

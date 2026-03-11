package com.cineplanet.backend.service;

import com.cineplanet.backend.model.CandyStoreItem;
import com.cineplanet.backend.model.dto.CandyStoreItemDTO;
import com.cineplanet.backend.repository.CandyStoreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandyStoreService {

    private static final Logger log = LoggerFactory.getLogger(CandyStoreService.class.getName());
    private final CandyStoreRepository candyStoreRepository;

    public CandyStoreService(CandyStoreRepository candyStoreRepository){
        this.candyStoreRepository = candyStoreRepository;
    }

    @Transactional
    public List<CandyStoreItemDTO> getAll(){
        try {
            log.info("CandyStoreService -> sp_web_get_candy_items");
            List<CandyStoreItemDTO> items = candyStoreRepository.getCandyItems()
                    .stream()
                    .map(item -> toDTO(item))
                    .collect(Collectors.toList());
            log.info("{} cantidad de productos", items.size());
            return items;
        } catch (Exception e) {
            log.error("Error al obtener los productos: ", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private CandyStoreItemDTO toDTO(CandyStoreItem item){
        CandyStoreItemDTO dto = new CandyStoreItemDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());
        dto.setPrice(item.getPrice());
        return dto;
    }
}

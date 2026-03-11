package com.cineplanet.backend.service;

import com.cineplanet.backend.model.dto.CompleteRequest;
import com.cineplanet.backend.model.dto.CompleteResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CompleteService {
    private static final Logger log = LoggerFactory.getLogger(CompleteService.class.getName());

    public CompleteResponse complete(CompleteRequest request){
        try{
            log.info("Propietario: ", request.getEmail());
            log.info("ID de transacción: ", request.getTransactionId());
            log.info("Fecha de operación: ", request.getOperationDate());
            return new CompleteResponse("0", "Transacción completada");
        } catch (Exception e){
            log.error("Error al completar la transacción: ", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}

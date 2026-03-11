package com.cineplanet.backend.repository;

import com.cineplanet.backend.model.Premiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PremiereRepository extends JpaRepository<Premiere, Long> {

    @Query(value = "CALL sp_web_get_premieres()", nativeQuery = true)
    List<Premiere> getPremieres();
}
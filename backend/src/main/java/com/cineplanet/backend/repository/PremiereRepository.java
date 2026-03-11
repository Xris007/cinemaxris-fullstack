package com.cineplanet.backend.repository;

import com.cineplanet.backend.model.Premiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PremiereRepository extends JpaRepository<Premiere, Long> {

    @Procedure(procedureName = "sp_web_get_premieres")
    List<Premiere> getPremieres();
}

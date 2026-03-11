package com.cineplanet.backend.repository;

import com.cineplanet.backend.model.Premiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PremiereRepository extends JpaRepository<Premiere, Long> {
}

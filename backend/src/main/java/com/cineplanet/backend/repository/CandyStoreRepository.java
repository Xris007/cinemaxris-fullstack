package com.cineplanet.backend.repository;

import com.cineplanet.backend.model.CandyStoreItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandyStoreRepository extends JpaRepository<CandyStoreItem, Long> {
}

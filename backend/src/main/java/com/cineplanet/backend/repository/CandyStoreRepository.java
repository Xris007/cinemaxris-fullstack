package com.cineplanet.backend.repository;

import com.cineplanet.backend.model.CandyStoreItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandyStoreRepository extends JpaRepository<CandyStoreItem, Long> {

    @Procedure(procedureName = "sp_web_get_candy_items")
    List<CandyStoreItem> getCandyItems();
}

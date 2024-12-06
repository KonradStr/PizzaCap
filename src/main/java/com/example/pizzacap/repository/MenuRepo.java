package com.example.pizzacap.repository;

import com.example.pizzacap.model.Menu_item;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepo extends JpaRepository<Menu_item, Integer> {
}

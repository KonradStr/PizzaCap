package com.example.pizzacap.repository;

import com.example.pizzacap.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepo extends JpaRepository<MenuItem, Integer> {
    List<MenuItem> findAllByOrderByMenuId();
}

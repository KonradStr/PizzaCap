package com.example.pizzacap.repository;

import com.example.pizzacap.model.MenuItem;
import com.example.pizzacap.model.MenuItemSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuSizeRepo extends JpaRepository<MenuItemSize, Integer> {
    List<MenuItemSize> findByMenuItem(MenuItem menuItem);
}

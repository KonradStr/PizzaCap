package com.example.pizzacap.repository;

import com.example.pizzacap.model.Customer;
import com.example.pizzacap.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepo extends JpaRepository<MenuItem, Integer> {

}

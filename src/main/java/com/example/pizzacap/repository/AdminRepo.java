package com.example.pizzacap.repository;

import com.example.pizzacap.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Admin findByUsername(String username);

    Admin findByUsernameAndPassword(String username, String password);

}

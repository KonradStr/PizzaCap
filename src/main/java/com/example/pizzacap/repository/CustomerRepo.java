package com.example.pizzacap.repository;

import com.example.pizzacap.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    Customer findByEmail(String email);

    Customer findByEmailAndPassword(String email, String password);
}

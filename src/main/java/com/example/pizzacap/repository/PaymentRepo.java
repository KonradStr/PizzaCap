package com.example.pizzacap.repository;


import com.example.pizzacap.model.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<Payments, Integer> {
}


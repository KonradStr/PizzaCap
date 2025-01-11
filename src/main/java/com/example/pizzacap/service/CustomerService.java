package com.example.pizzacap.service;

import com.example.pizzacap.model.Customer;
import com.example.pizzacap.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    CustomerRepo repo;

    public void registerCustomer(Customer customer) {
        repo.save(customer);
    }

    public boolean isEmailRegistered(String email) {
        if (repo.findByEmail(email) == null) {
            return false;
        }
        return true;
    }

    public Customer validateCustomer(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }
}

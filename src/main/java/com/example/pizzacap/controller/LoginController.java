package com.example.pizzacap.controller;

import com.example.pizzacap.model.Customer;
import com.example.pizzacap.model.LoginRequest;
import com.example.pizzacap.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    CustomerService service;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Customer validCustomer = service.validateCustomer(loginRequest.getEmail(), loginRequest.getPassword());

        if (Objects.nonNull(validCustomer)) {
            return ResponseEntity.ok("Zalogowano pomyślnie");
        } else {
            return ResponseEntity.status(401).body("Niepoprawny email lub hasło");

        }
    }
}

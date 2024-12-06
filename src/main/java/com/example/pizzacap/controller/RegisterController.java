package com.example.pizzacap.controller;

import com.example.pizzacap.model.Customer;
import com.example.pizzacap.model.RegisterData;
import com.example.pizzacap.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDateTime;


@RestController
@CrossOrigin
public class RegisterController {

    @Autowired
    CustomerService service;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterData registerData) {
        if (!service.isEmailRegistered(registerData.getEmail())) {
            Customer newCustomer = new Customer();
            newCustomer.setFirst_name(registerData.getFirst_name());
            newCustomer.setLast_name(registerData.getLast_name());
            newCustomer.setEmail(registerData.getEmail());
            newCustomer.setPhone_number(registerData.getPhone_number());
            newCustomer.setPassword(registerData.getPassword());
            newCustomer.setRegistration_date(LocalDateTime.now());
            System.out.println(newCustomer);
            System.out.println(registerData);
            service.registerCustomer(newCustomer);
            return ResponseEntity.ok("Pomyślnie zarejestrowano");
        } else {
            return ResponseEntity.status(401).body("Konto z podanym emailem już istnieje");
        }
    }
}

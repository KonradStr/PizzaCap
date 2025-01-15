package com.example.pizzacap.controller;

import com.example.pizzacap.model.*;
import com.example.pizzacap.service.AdminService;
import com.example.pizzacap.service.CustomerService;
import com.example.pizzacap.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    CustomerService service;
    @Autowired
    AdminService adminService;
    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<TokenAuth> login(@RequestBody LoginRequest loginRequest) {
        Customer validCustomer = service.validateCustomer(loginRequest.getEmail(), loginRequest.getPassword());

        if (Objects.nonNull(validCustomer)) {
            String token = tokenService.generateNewUserToken(validCustomer.getCustomerId());
            TokenAuth tokenAuth = new TokenAuth();
            tokenAuth.setToken(token);
            tokenAuth.setUsername(String.valueOf(validCustomer.getCustomerId()));
            return ResponseEntity.ok(tokenAuth);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }


    @PostMapping("/admin/login")
    public ResponseEntity<String> adminLogin(@RequestBody AdminLoginRequest loginRequest) {
        Admin validAdmin = adminService.validateAdmin(loginRequest.getUsername(), loginRequest.getPassword());
        if (Objects.nonNull(validAdmin)) {
            String token = tokenService.generateNewToken(validAdmin.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Niepoprawny email lub hasło");
        }
    }

    @PostMapping("/admin/token")
    public ResponseEntity<String> adminToken(@RequestBody TokenAuth token) {
        if(tokenService.checkToken(token)){
            return ResponseEntity.ok("Poprawny token");
        } else {
            return ResponseEntity.status(401).body("Niepoprawny token");
        }
    }
}

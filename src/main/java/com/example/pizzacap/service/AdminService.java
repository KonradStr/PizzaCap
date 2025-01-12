package com.example.pizzacap.service;

import com.example.pizzacap.model.Admin;
import com.example.pizzacap.model.TokenAuth;
import com.example.pizzacap.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    AdminRepo repo;


    public void registerAdmin(Admin admin) {
        repo.save(admin);
    }

    public boolean isEmailRegistered(String username) {
        if (repo.findByUsername(username) == null) {
            return false;
        }
        return true;
    }

    public Admin validateAdmin(String username, String password) {
        return repo.findByUsernameAndPassword(username, password);
    }

}

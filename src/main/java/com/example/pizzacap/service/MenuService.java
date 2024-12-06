package com.example.pizzacap.service;

import com.example.pizzacap.model.Menu_item;
import com.example.pizzacap.repository.MenuRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    @Autowired
    MenuRepo repo;

    public List<Menu_item> getMenu() {
        return repo.findAll();
    }
}

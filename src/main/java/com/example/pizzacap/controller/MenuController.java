package com.example.pizzacap.controller;

import com.example.pizzacap.model.Menu_item;
import com.example.pizzacap.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class MenuController {
    @Autowired
    MenuService service;

    @GetMapping("/menu_items")
    public List<Menu_item> getMenu() {
        return service.getMenu();
    }
}

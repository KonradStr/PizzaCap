package com.example.pizzacap.controller;

import com.example.pizzacap.model.Restaurant;
import com.example.pizzacap.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class RestaurantController {
    @Autowired
    RestaurantService service;

    @GetMapping("/restaurants")
    public List<Restaurant> getRestaurants() {
        return service.getRestaurants();
    }
}

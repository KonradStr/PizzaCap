package com.example.pizzacap.controller;

import com.example.pizzacap.model.Restaurant;
import com.example.pizzacap.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

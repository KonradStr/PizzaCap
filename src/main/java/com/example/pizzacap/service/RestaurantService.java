package com.example.pizzacap.service;

import com.example.pizzacap.model.Restaurant;
import com.example.pizzacap.repository.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {
    @Autowired
    RestaurantRepo repo;

    public List<Restaurant> getRestaurants() {
        return repo.findAll();
    }
}

package com.example.pizzacap.service;

import com.example.pizzacap.model.*;
import com.example.pizzacap.repository.AdminRepo;
import com.example.pizzacap.repository.MenuRepo;
import com.example.pizzacap.repository.MenuSizeRepo;
import com.example.pizzacap.repository.RestaurantRepo;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminSettingsService {
    @Autowired
    AdminRepo adminRepo;

    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    MenuRepo menuRepo;

    @Autowired
    MenuSizeRepo menuSizeRepo;

//    @Autowired
//    EntityManager entityManager;

    public void createRestaurantEntity(Restaurant restaurant, Admin admin) {
        Restaurant savedRestaurant = restaurantRepo.save(restaurant);

        admin.setRestaurant(restaurant);

        adminRepo.save(admin);
    }

    public void createAdminManagerAccount(Admin admin){
        adminRepo.save(admin);
    }

    public void createRestaurant(Restaurant restaurant) {
        restaurantRepo.save(restaurant);
    }

    public void addNewItemToMenu(MenuItem menuItem) {
        MenuItem savedMenuItem = menuRepo.save(menuItem);

        for (MenuItemSize size : menuItem.getSizes()) {
            size.setMenuItem(savedMenuItem);
            menuSizeRepo.save(size);
        }
    }

    public void addNewManagerAdmin(Admin admin) {

        if (admin.getRestaurant() != null && admin.getRestaurant().getRestaurant_id() > 0) {
            Restaurant restaurant = restaurantRepo.findById(admin.getRestaurant().getRestaurant_id()).orElse(null);

            admin.setRestaurant(restaurant);
        }
        admin.setRole('M');
        adminRepo.save(admin);
    }
}

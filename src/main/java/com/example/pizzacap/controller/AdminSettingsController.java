package com.example.pizzacap.controller;

import com.example.pizzacap.model.Admin;
import com.example.pizzacap.model.MenuItem;
import com.example.pizzacap.model.NewRestaurantData;
import com.example.pizzacap.model.Restaurant;
import com.example.pizzacap.service.AdminSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AdminSettingsController {

    @Autowired
    AdminSettingsService service;

    @PostMapping("/admin/restaurants")
    public ResponseEntity<String> addRestaurantStructure(@RequestBody NewRestaurantData newRestaurantData){
        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(newRestaurantData.getAddress());
        restaurant.setPhone_number(newRestaurantData.getPhone_number());

        Admin admin = new Admin();
        admin.setUsername(newRestaurantData.getAdmin_username());
        admin.setPassword(newRestaurantData.getAdmin_password());
        admin.setRole('M');

        try {
            service.createRestaurantEntity(restaurant, admin);
            return ResponseEntity.ok("Pomyslnie utworzono obiekty zwiazane z restauracja");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Error");
        }
    }

    @PostMapping("/admin/menu")
    public ResponseEntity<String> addMenuPosition(@RequestBody MenuItem menuItem) {
        try {
            service.addNewItemToMenu(menuItem);
            return ResponseEntity.ok("Pomyslnie dodano pozycje do menu");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Error");
        }
    }

    @PostMapping("/admin/admin_manager")
    public ResponseEntity<String> addAdminManager(@RequestBody Admin admin) {
        try {
            service.addNewManagerAdmin(admin);
            return ResponseEntity.ok("Pomyslnie dodano menagera do restauracji");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Error");
        }
    }
}

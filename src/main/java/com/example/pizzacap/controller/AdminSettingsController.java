package com.example.pizzacap.controller;

import com.example.pizzacap.model.*;
import com.example.pizzacap.service.AdminSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/admin/restaurant/{restaurantId}")
    public List<OrderTicket> getRestaurantActiveOrders(@PathVariable int restaurantId){
        return service.getRestaurantActiveOrders(restaurantId);
    }

    @PutMapping("/admin/order/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable int orderId, @RequestBody Map<String, String> request) {
        String newStatus = request.get("status");

        try {
            Order updatedOrder = service.changeOrderStatus(orderId, newStatus);
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(null);
        }
    }
}

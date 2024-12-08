package com.example.pizzacap.controller;

import com.example.pizzacap.model.MenuItem;
import com.example.pizzacap.model.MenuToDisplay;
import com.example.pizzacap.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MenuController {
    @Autowired
    MenuService service;

    @GetMapping("/menu_items")
    public List<MenuToDisplay> getMenu(){
        return service.getMenu();
    }

    /*
    @GetMapping("/menu_items/{menu_id}/image")
    public ResponseEntity<byte[]> getImageByMenuId(@PathVariable int menu_id) {
        MenuItem menuItem = service.getMenuItem(menu_id);

        if (menuItem != null && menuItem.getImage() != null) {
            return ResponseEntity.ok().contentType(MediaType.valueOf("image/webp")).body(menuItem.getImage());
        }

        return ResponseEntity.notFound().build();
    }
     */
}

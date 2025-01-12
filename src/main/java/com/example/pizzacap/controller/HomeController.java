package com.example.pizzacap.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String helloWorldTest() {
        return "Hello world";
    }

    @GetMapping("/menu")
    public String menu() {
        return "Picka";
    }
}

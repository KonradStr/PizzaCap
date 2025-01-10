package com.example.pizzacap.controller;

import com.example.pizzacap.model.OrderInfo;
import com.example.pizzacap.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    OrderService service;

    @GetMapping("/zamowienie/{orderId}")
    public ResponseEntity<OrderInfo> getOrderById(@PathVariable int orderId) {
        try {
            OrderInfo orderInfo = service.getOrderInfo(orderId);
            return ResponseEntity.ok(orderInfo);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
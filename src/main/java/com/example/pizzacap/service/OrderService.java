package com.example.pizzacap.service;

import com.example.pizzacap.model.Order;
import com.example.pizzacap.model.OrderInfo;
import com.example.pizzacap.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    OrderRepo repo;

    public OrderInfo getOrderInfo(int orderId) {
        Order orderData = repo.findById(orderId).orElse(null);

        if (orderData == null) {
            throw new IllegalArgumentException("Zamówienie o ID: " + orderId + " nie zostało znalezione.");
        }

        OrderInfo orderInfo = new OrderInfo();

        orderInfo.setOrder_id(orderData.getOrder_id());
        orderInfo.setTotal_price(orderData.getTotal_price());
        orderInfo.setOrder_data(orderData.getOrder_data());
        orderInfo.setStatus(orderData.getStatus());
        orderInfo.setAdditional_note(orderData.getAdditional_note());
        orderInfo.setCustomer_address(orderData.getAddress());
        orderInfo.setFirst_name(orderData.getCustomer().getFirst_name());
        orderInfo.setLast_name(orderData.getCustomer().getLast_name());
        orderInfo.setEmail(orderData.getCustomer().getEmail());
        orderInfo.setCustomer_phone_number(orderData.getCustomer().getPhone_number());
        orderInfo.setRestaurant_address(orderData.getRestaurant().getAddress());
        orderInfo.setRestaurant_phone_number(orderData.getRestaurant().getPhone_number());

        return orderInfo;
    }
}

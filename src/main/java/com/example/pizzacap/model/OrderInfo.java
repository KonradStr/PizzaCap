package com.example.pizzacap.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderInfo {
    private int order_id;
    private double total_price;
    private LocalDateTime order_date;
    private String status;
    private String additional_note;
    private String customer_address;
    private String first_name;
    private String last_name;
    private String email;
    private String customer_phone_number;
    private String restaurant_address;
    private String restaurant_phone_number;

}

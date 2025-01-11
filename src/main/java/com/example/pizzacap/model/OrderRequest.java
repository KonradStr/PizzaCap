package com.example.pizzacap.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;
@Setter
@Getter
public class OrderRequest {
    private String additionalNote;
    private String address;
    private String restaurantId;
    private String customerId;
    private String paymentMethod;
}

package com.example.pizzacap.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderTicketPosition {
    private String name;
    private String item_size;
    private int quantity;
}

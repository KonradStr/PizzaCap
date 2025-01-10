package com.example.pizzacap.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
public class Cart {
    public Cart(UUID id) {
        this.id = id;
        this.items = new ArrayList<>();
    }

    private UUID id;


    private List<CartItem> items;

    @Override
    public String toString() {
        String itemsString = "";
        for(CartItem item : items){
            itemsString += item;
        }
        return "Cart{" +
                "id=" + id +
                ", items=" + itemsString +
                ", isEmpty=" + items.isEmpty() + items.size() +
                '}';
    }
}
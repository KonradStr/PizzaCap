package com.example.pizzacap.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String size;
    private int sizeId;
    private double price;
    private int quantity;

    @Override
    public String toString() {
        return "CartItem{" +
                ", productId=" + id +
                ", sizeId=" + sizeId +
                ", quantity=" + quantity +
                ", price=" + price +
                ", name=" + name +
                ", sizeName=" + size +

                '}';
    }
}
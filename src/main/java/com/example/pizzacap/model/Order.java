package com.example.pizzacap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int order_id;

    @Column(name = "total_price")
    private double total_price;

    @CreatedDate
    @Column(name = "order_date")
    private LocalDateTime order_date;

    @Column(name = "status")
    private String status;

    @Column(name = "additional_note")
    private String additional_note;

    @Column(name = "address")
    private String address;

    @ManyToOne
    @JoinColumn(name = "customer_id" ,referencedColumnName = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "restaurant_id" ,referencedColumnName = "restaurant_id")
    private Restaurant restaurant;
}

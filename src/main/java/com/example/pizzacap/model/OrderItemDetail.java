package com.example.pizzacap.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "orders_menu_items_sizes")
public class OrderItemDetail {
    @EmbeddedId
    private OrderItemDetailPK orderItemDetailPK;

    @Column(name = "quantity")
    private int quantity;

}

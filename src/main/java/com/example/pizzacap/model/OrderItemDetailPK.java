package com.example.pizzacap.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class OrderItemDetailPK implements Serializable {
    @Column(name = "order_id")
    private int orderId;

    @Column(name = "menu_size_id")
    private int menuSizeId;
}

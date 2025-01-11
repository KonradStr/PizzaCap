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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemDetailPK that = (OrderItemDetailPK) o;
        return orderId == that.orderId && menuSizeId == that.menuSizeId;
    }

    @Override
    public int hashCode() {
        return 31 * orderId + menuSizeId;
    }

}

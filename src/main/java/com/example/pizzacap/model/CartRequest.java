package com.example.pizzacap.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequest {
    private String quantity;
    private String itemSizeId;
    private String itemName;
    private String itemSize;
}

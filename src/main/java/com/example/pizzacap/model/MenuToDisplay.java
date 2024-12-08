package com.example.pizzacap.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MenuToDisplay {
    private int menuId;
    private String name;
    private String description;
    private String type;
    private String image;
    private List<MenuToDisplaySize> sizes;


    @Getter
    @Setter
    public static class MenuToDisplaySize{
        private int menuSizeId;
        private String itemSize;
        private double price;
    }
}

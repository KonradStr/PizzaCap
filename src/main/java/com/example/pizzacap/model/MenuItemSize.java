package com.example.pizzacap.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity
@Table(name = "menu_items_sizes")
public class MenuItemSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_size_id")
    private int menuSizeId;

    @ManyToOne
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private MenuItem menuItem;

    @Column(name = "item_size")
    private String item_size;

    @Column(name = "price")
    private double price;
}

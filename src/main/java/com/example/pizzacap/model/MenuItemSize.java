package com.example.pizzacap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity
@Table(name = "menu_items_sizes")
public class MenuItemSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_size_id")
    private int menu_size_id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private MenuItem menuItem;

    @Column(name = "item_size")
    private String itemSize;

    @Column(name = "price")
    private double price;
}

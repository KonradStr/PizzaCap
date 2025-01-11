package com.example.pizzacap.service;

import com.example.pizzacap.model.*;
import com.example.pizzacap.repository.MenuSizeRepo;
import com.example.pizzacap.repository.OrderItemDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.pizzacap.repository.OrderRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CartService {
    @Autowired
    OrderItemDetailRepo orderItemDetailRepo;

    @Autowired
    MenuSizeRepo repoMenuSize;

    @Autowired
    OrderRepo repoOrder;

    List<Cart> carts= new ArrayList<>();

    public UUID getCartID(){
        UUID uuid = UUID.randomUUID();
        carts.add(new Cart(uuid));
        return uuid;
    }

    public Cart getCart(UUID cartId){
        return carts.stream().filter(s -> {return s.getId().equals(cartId);}).findAny().orElse(null);
    }

    public void addItemToCart(UUID cartId, CartItem newItem) {
        Cart cart = getCart(cartId);
        cart.getItems().add(newItem);
    }

    public void updateItemQuantity(UUID userId, Long productId, int itemSize, int quantity, String name, String size) {
        Cart cart = getCart(userId);
        if(cart.getItems().stream().filter(s -> {return (s.getId().equals(productId) && s.getSizeId() == itemSize);}).findAny().orElse(null) == null){
            CartItem newItem = new CartItem();
            newItem.setId(productId);
            newItem.setQuantity(1);
            newItem.setSizeId(itemSize);
            newItem.setName(name);
            newItem.setSize(size);
            MenuItemSize menuItemSize = repoMenuSize.findByMenuSizeId(itemSize);
            newItem.setPrice(menuItemSize.getPrice());
            cart.getItems().add(newItem);
        }else {
            cart.getItems().forEach(item -> {
                if (item.getId().equals(productId) && item.getSizeId() == itemSize) {
                    if (quantity <= 0) {
                        System.out.println("jest równe 0");
                        List<CartItem> list = new ArrayList<>(List.copyOf(cart.getItems()));
                        list.remove(item);
                        cart.setItems(list);
                    } else {
                        item.setQuantity(quantity);
                    }
                }
            });
        }
        System.out.println(cart);
    }

    public int createOrder(Order order){
        repoOrder.save(order);
        return order.getOrder_id();
    }
    public void createOrderItems(OrderItemDetail orderItemDetail){
        orderItemDetailRepo.save(orderItemDetail);
    }

}

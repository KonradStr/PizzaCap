package com.example.pizzacap.service;

import com.example.pizzacap.model.Cart;
import com.example.pizzacap.model.CartItem;
import com.example.pizzacap.model.MenuItemSize;
import com.example.pizzacap.repository.MenuSizeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CartService {

    @Autowired
    MenuSizeRepo repoMenuSize;

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
        if(cart.getItems().stream().filter(s -> {return (s.getProductId().equals(productId) && s.getSizeId() == itemSize);}).findAny().orElse(null) == null){
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setQuantity(1);
            newItem.setSizeId(itemSize);
            newItem.setName(name);
            newItem.setSize(size);
            MenuItemSize menuItemSize = repoMenuSize.findByMenuSizeId(itemSize);
            newItem.setPrice(menuItemSize.getPrice());
            cart.getItems().add(newItem);
        }else {
            cart.getItems().forEach(item -> {
                if (item.getProductId().equals(productId) && item.getSizeId() == itemSize) {
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

}

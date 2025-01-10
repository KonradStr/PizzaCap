package com.example.pizzacap.controller;

import com.example.pizzacap.model.Cart;
import com.example.pizzacap.model.CartItem;
import com.example.pizzacap.model.CartRequest;
import com.example.pizzacap.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/getID")
    public UUID getID(){
        return cartService.getCartID();
    }

    @GetMapping("/{cartId}")
    public Cart getCart(@PathVariable UUID cartId) {
        Cart cart = cartService.getCart(cartId);
        System.out.println(cart);
        return cart;
    }

    @PostMapping("/{cartId}/items")
    public void addItemToCart(@PathVariable UUID cartId, @RequestBody CartItem newItem) {
        cartService.addItemToCart(cartId, newItem);
    }

    @PostMapping("/{cartId}/items/{productId}")
    public void updateItemQuantity(
            @PathVariable UUID cartId,
            @PathVariable Long productId,
            @RequestBody CartRequest cartRequest) {
        System.out.println("quantity: " + cartRequest.getQuantity() + " " + cartRequest.getItemSizeId());
        cartService.updateItemQuantity(
                cartId,
                productId,
                Integer.parseInt(cartRequest.getItemSizeId()),
                Integer.parseInt(cartRequest.getQuantity()),
                cartRequest.getItemName(),
                cartRequest.getItemSize());
    }

}

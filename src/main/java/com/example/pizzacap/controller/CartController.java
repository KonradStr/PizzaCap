package com.example.pizzacap.controller;

import com.example.pizzacap.model.*;
import com.example.pizzacap.repository.CustomerRepo;
import com.example.pizzacap.repository.PaymentRepo;
import com.example.pizzacap.repository.RestaurantRepo;
import com.example.pizzacap.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private RestaurantRepo restaurantRepo;
    @Autowired
    private PaymentRepo paymentRepo;

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

    @PostMapping("/{cartId}/order")
    public ResponseEntity<String> placeOrder(@PathVariable UUID cartId, @RequestBody OrderRequest orderRequest){
        Cart cart = cartService.getCart(cartId);
        System.out.println("cart: " + cart);
        System.out.println(orderRequest.getRestaurantId());
        int orderId;
        if(cart == null){
            return ResponseEntity.status(404).body("Koszyk nie istnieje");
        }else{

            Order order = new Order();
            order.setTotal_price(cart.calculateTotalPrice());
            order.setOrderDate(LocalDateTime.now());
            order.setStatus("Nowe");
            order.setAdditional_note(orderRequest.getAdditionalNote());
            order.setAddress(orderRequest.getAddress());
            Customer customer = customerRepo.findById(Integer.parseInt(orderRequest.getCustomerId())).orElse(null);
            order.setCustomer(customer);
            Restaurant restaurant = restaurantRepo.findById(Integer.parseInt(orderRequest.getRestaurantId())).orElse(null);
            order.setRestaurant(restaurant);
            orderId = cartService.createOrder(order);


            for(CartItem item : cart.getItems()){
                OrderItemDetail orderItemDetail = new OrderItemDetail();
                OrderItemDetailPK orderItemDetailPK = new OrderItemDetailPK();
                orderItemDetailPK.setOrderId(orderId);
                orderItemDetailPK.setMenuSizeId(item.getSizeId());
                orderItemDetail.setOrderItemDetailPK(orderItemDetailPK);
                orderItemDetail.setQuantity(item.getQuantity());
                System.out.println("Wpisywanie: " + orderItemDetail.getOrderItemDetailPK().getOrderId() + " " + orderItemDetail.getOrderItemDetailPK().getMenuSizeId() + " " + orderItemDetail.getQuantity());
                cartService.createOrderItems(orderItemDetail);
            }

            Payments payments = new Payments();
            payments.setPaymentDate(LocalDateTime.now());
            payments.setPaymentAmount(order.getTotal_price());
            payments.setPaymentStatus("Zapłacone");
            payments.setPaymentMethod(orderRequest.getPaymentMethod());
            payments.setOrder(order);
            paymentRepo.save(payments);

        }
        return ResponseEntity.ok(String.valueOf(orderId));

    }
}



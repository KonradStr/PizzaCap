package com.example.pizzacap.service;

import com.example.pizzacap.model.*;
import com.example.pizzacap.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminSettingsService {
    @Autowired
    AdminRepo adminRepo;

    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    MenuRepo menuRepo;

    @Autowired
    MenuSizeRepo menuSizeRepo;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    OrderItemDetailRepo orderItemDetailRepo;

    public void createRestaurantEntity(Restaurant restaurant, Admin admin) {
        Restaurant savedRestaurant = restaurantRepo.save(restaurant);

        admin.setRestaurant(restaurant);

        adminRepo.save(admin);
    }

    public void createAdminManagerAccount(Admin admin) {
        adminRepo.save(admin);
    }

    public void createRestaurant(Restaurant restaurant) {
        restaurantRepo.save(restaurant);
    }

    public void addNewItemToMenu(MenuItem menuItem) {
        MenuItem savedMenuItem = menuRepo.save(menuItem);

        for (MenuItemSize size : menuItem.getSizes()) {
            size.setMenuItem(savedMenuItem);
            menuSizeRepo.save(size);
        }
    }

    public void addNewManagerAdmin(Admin admin) {

        if (admin.getRestaurant() != null && admin.getRestaurant().getRestaurantId() > 0) {
            Restaurant restaurant = restaurantRepo.findById(admin.getRestaurant().getRestaurantId()).orElse(null);

            admin.setRestaurant(restaurant);
        }
        admin.setRole('M');
        adminRepo.save(admin);
    }

    public List<OrderTicket> getRestaurantActiveOrders(int restaurantId) {
        List<Order> restaurantOrders = orderRepo.findByRestaurant_RestaurantId(restaurantId);
        List<OrderTicket> orderTicketList = new ArrayList<>();

        for (Order order : restaurantOrders) {
            OrderTicket orderTicket = new OrderTicket();
            orderTicket.setOrder_id(order.getOrder_id());
            orderTicket.setOrder_date(order.getOrderDate());
            orderTicket.setStatus(order.getStatus());
            orderTicket.setAdditional_note(order.getAdditional_note());
            List<OrderTicketPosition> orderTicketPositions = new ArrayList<>();

            List<OrderItemDetail> orderItemDetails = orderItemDetailRepo.findByOrderItemDetailPK_OrderId(order.getOrder_id());

            for (OrderItemDetail orderItemDetail : orderItemDetails) {
                MenuItemSize menuItemSize = menuSizeRepo.findById(orderItemDetail.getOrderItemDetailPK().getMenuSizeId()).orElse(null);

                if (menuItemSize != null) {
                    MenuItem menuItem = menuRepo.findById(menuItemSize.getMenuItem().getMenuId()).orElse(null);
                    if (menuItem != null) {
                        OrderTicketPosition position = new OrderTicketPosition();
                        position.setName(menuItem.getName());
                        position.setItem_size(menuItemSize.getItemSize());
                        position.setQuantity(orderItemDetail.getQuantity());
                        orderTicketPositions.add(position);
                    }
                }
            }

            orderTicket.setOrderItemPositionList(orderTicketPositions);

            orderTicketList.add(orderTicket);
        }

        return orderTicketList;
    }

    public Order changeOrderStatus(int orderId, String newStatus) {
        Order order = orderRepo.findById(orderId).orElse(null);

        order.setStatus(newStatus);
        orderRepo.save(order);

        return order;
    }
}

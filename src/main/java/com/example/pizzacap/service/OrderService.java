package com.example.pizzacap.service;

import com.example.pizzacap.model.*;
import com.example.pizzacap.repository.MenuRepo;
import com.example.pizzacap.repository.MenuSizeRepo;
import com.example.pizzacap.repository.OrderItemDetailRepo;
import com.example.pizzacap.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepo orderRepo;

    @Autowired
    OrderItemDetailRepo orderItemDetailRepo;

    @Autowired
    MenuRepo menuRepo;

    @Autowired
    MenuSizeRepo menuSizeRepo;

    public OrderInfo getOrderInfo(int orderId) {
        Order orderData = orderRepo.findById(orderId).orElse(null);

        if (orderData == null) {
            throw new IllegalArgumentException("Zamówienie o ID: " + orderId + " nie zostało znalezione.");
        }

        OrderInfo orderInfo = new OrderInfo();

        orderInfo.setOrder_id(orderData.getOrder_id());
        orderInfo.setTotal_price(orderData.getTotal_price());
        orderInfo.setOrder_date(orderData.getOrder_date());
        orderInfo.setStatus(orderData.getStatus());
        orderInfo.setAdditional_note(orderData.getAdditional_note());
        orderInfo.setCustomer_address(orderData.getAddress());
        orderInfo.setFirst_name(orderData.getCustomer().getFirst_name());
        orderInfo.setLast_name(orderData.getCustomer().getLast_name());
        orderInfo.setEmail(orderData.getCustomer().getEmail());
        orderInfo.setCustomer_phone_number(orderData.getCustomer().getPhone_number());
        orderInfo.setRestaurant_address(orderData.getRestaurant().getAddress());
        orderInfo.setRestaurant_phone_number(orderData.getRestaurant().getPhone_number());

        return orderInfo;
    }

    public List<OrderTicket> getUserOrdersHistory(int customerId) {
        List<Order> userOrders = orderRepo.findByCustomer_CustomerId(customerId);
        List<OrderTicket> orderTicketList = new ArrayList<>();

        for (Order order : userOrders) {
            OrderTicket orderTicket = new OrderTicket();
            orderTicket.setOrder_id(order.getOrder_id());
            orderTicket.setOrder_date(order.getOrder_date());
            orderTicket.setStatus(order.getStatus());
            orderTicket.setAdditional_note(order.getAdditional_note());
            List<OrderTicketPosition> orderTicketPositions = new ArrayList<>();

            List<OrderItemDetail> orderItemDetails = orderItemDetailRepo.findByOrderItemDetailPK_OrderId(order.getOrder_id());

            for (OrderItemDetail orderItemDetail : orderItemDetails) {
                MenuItemSize menuItemSize = menuSizeRepo.findById(orderItemDetail.getOrderItemDetailPK().getMenuSizeId()).orElse(null);

                if (menuItemSize != null) {
                    MenuItem menuItem = menuRepo.findById(menuItemSize.getMenuItem().getMenu_id()).orElse(null);
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
}

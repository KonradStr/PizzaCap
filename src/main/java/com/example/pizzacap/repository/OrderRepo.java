package com.example.pizzacap.repository;

import com.example.pizzacap.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    List<Order> findByRestaurant_RestaurantId(int restaurantId);

    List<Order> findByCustomer_CustomerIdOrderByOrderDateDesc(int customerId, Pageable pageable);

}

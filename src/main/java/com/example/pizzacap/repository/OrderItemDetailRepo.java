package com.example.pizzacap.repository;

import com.example.pizzacap.model.OrderItemDetail;
import com.example.pizzacap.model.OrderItemDetailPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemDetailRepo extends JpaRepository<OrderItemDetail, OrderItemDetailPK> {
    List<OrderItemDetail> findByOrderItemDetailPK_OrderId(int orderId);
}

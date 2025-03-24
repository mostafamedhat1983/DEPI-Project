package com.shop.shop.data.repositories;

import com.shop.shop.data.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "orderItems", path = "orderItems")
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}

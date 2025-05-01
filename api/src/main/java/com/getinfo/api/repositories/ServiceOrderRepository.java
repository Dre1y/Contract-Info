package com.getinfo.api.repositories;

import com.getinfo.api.domain.serviceOrder.ServiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, UUID> {
}
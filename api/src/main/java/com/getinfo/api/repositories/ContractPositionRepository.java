package com.getinfo.api.repositories;

import com.getinfo.api.domain.contractPosition.ContractPosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContractPositionRepository extends JpaRepository<ContractPosition, UUID> {
}


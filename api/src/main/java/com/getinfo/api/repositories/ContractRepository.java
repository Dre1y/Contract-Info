package com.getinfo.api.repositories;

import com.getinfo.api.domain.contract.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContractRepository extends JpaRepository<Contract, UUID> {
}


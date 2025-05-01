package com.getinfo.api.repositories;

import com.getinfo.api.domain.contractAmendment.ContractAmendment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContractAmendmentRepository extends JpaRepository<ContractAmendment, UUID> {
}
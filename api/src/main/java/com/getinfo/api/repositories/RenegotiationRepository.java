package com.getinfo.api.repositories;

import com.getinfo.api.domain.renegotiation.Renegotiation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RenegotiationRepository extends JpaRepository<Renegotiation, UUID> {
    List<Renegotiation> findByContractId(UUID contractId);
}
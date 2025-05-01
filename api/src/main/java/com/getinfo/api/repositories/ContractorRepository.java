package com.getinfo.api.repositories;

import com.getinfo.api.domain.contractor.Contractor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContractorRepository extends JpaRepository<Contractor, UUID> {
}

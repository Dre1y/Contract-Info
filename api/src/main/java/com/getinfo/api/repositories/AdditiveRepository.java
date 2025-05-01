package com.getinfo.api.repositories;

import com.getinfo.api.domain.additive.Additive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AdditiveRepository extends JpaRepository<Additive, UUID> {
}

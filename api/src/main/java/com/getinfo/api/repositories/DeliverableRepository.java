package com.getinfo.api.repositories;

import com.getinfo.api.domain.deliverable.Deliverable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DeliverableRepository extends JpaRepository<Deliverable, UUID> {
}

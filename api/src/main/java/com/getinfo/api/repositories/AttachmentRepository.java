package com.getinfo.api.repositories;

import com.getinfo.api.domain.attachment.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AttachmentRepository extends JpaRepository<Attachment, UUID> {
    List<Attachment> findByContractId(UUID contractId);
}

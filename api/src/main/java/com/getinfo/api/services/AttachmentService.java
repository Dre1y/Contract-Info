package com.getinfo.api.services;

import com.getinfo.api.DTOS.attachment.AttachmentRequestDTO;
import com.getinfo.api.DTOS.attachment.AttachmentResponseDTO;
import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.repositories.AttachmentRepository;
import com.getinfo.api.repositories.ContractRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final ContractRepository contractRepository;

    public AttachmentResponseDTO create(AttachmentRequestDTO dto) {
        Contract contract = contractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new EntityNotFoundException("Contrato não encontrado"));

        Attachment attachment = new Attachment();
        attachment.setAttachmentType(dto.getAttachmentType());
        attachment.setAttachedUrl(dto.getAttachedUrl());
        attachment.setDeliverablesUrl(dto.getDeliverablesUrl());
        attachment.setContract(contract);

        return toDTO(attachmentRepository.save(attachment));
    }

    public List<AttachmentResponseDTO> getAllByContract(UUID contractId) {
        return attachmentRepository.findByContractId(contractId).stream()
                .map(this::toDTO)
                .toList();
    }

    public List<AttachmentResponseDTO> getAll() {
    return attachmentRepository.findAll()
        .stream()
        .map(AttachmentResponseDTO::new)
        .toList();
    }

    public void delete(UUID id) {
        attachmentRepository.deleteById(id);
    }

    private AttachmentResponseDTO toDTO(Attachment attachment) {
        AttachmentResponseDTO dto = new AttachmentResponseDTO();
        dto.setId(attachment.getId());
        dto.setAttachmentType(attachment.getAttachmentType().toString());
        dto.setAttachedUrl(attachment.getAttachedUrl());
        dto.setDeliverablesUrl(attachment.getDeliverablesUrl());
        dto.setContractId(attachment.getContract().getId());
        return dto;
    }
}
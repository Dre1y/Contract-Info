package com.getinfo.api.services;

import com.getinfo.api.DTOS.additive.AdditiveRequestDTO;
import com.getinfo.api.DTOS.additive.AdditiveResponseDTO;
import com.getinfo.api.domain.additive.Additive;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.repositories.AdditiveRepository;
import com.getinfo.api.repositories.ContractRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.getinfo.api.enums.Status;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdditiveService {

    private final AdditiveRepository additiveRepository;
    private final ContractRepository contractRepository;

    public AdditiveResponseDTO create(AdditiveRequestDTO dto) {
        Contract contract = contractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new EntityNotFoundException("Contrato não encontrado"));

        Additive additive = new Additive();
        additive.setAdditiveType(dto.getAdditiveType());
        additive.setAdjustedValue(dto.getAdjustedValue());
        additive.setExtendedDeadline(dto.getExtendedDeadline());
        additive.setDetails(dto.getDetails());
        additive.setStatus(Status.PENDENTE);
        additive.setChangeReason(dto.getChangeReason());
        additive.setApprovedBy(null);
        additive.setContract(contract);

        return toDTO(additiveRepository.save(additive));
    }

    public List<AdditiveResponseDTO> getAll() {
        return additiveRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public AdditiveResponseDTO approve(UUID id, String approver) {
        Additive additive = additiveRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aditivo não encontrado"));

        additive.setStatus(Status.APROVADO);
        additive.setApprovedBy(approver);

        return toDTO(additiveRepository.save(additive));
    }

    public AdditiveResponseDTO reject(UUID id, String approver) {
        Additive additive = additiveRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aditivo não encontrado"));

        additive.setStatus(Status.REJEITADO);
        additive.setApprovedBy(approver);

        return toDTO(additiveRepository.save(additive));
    }

    public void delete(UUID id) {
        additiveRepository.deleteById(id);
    }

    private AdditiveResponseDTO toDTO(Additive additive) {
        AdditiveResponseDTO dto = new AdditiveResponseDTO();
        dto.setId(additive.getId().toString());
        dto.setAdditiveType(additive.getAdditiveType().toString());
        dto.setAdjustedValue(additive.getAdjustedValue() != null ? additive.getAdjustedValue().toString() : null);
        dto.setExtendedDeadline(additive.getExtendedDeadline() != null ? additive.getExtendedDeadline().toString() : null);
        dto.setDetails(additive.getDetails());
        dto.setChangeReason(additive.getChangeReason());
        dto.setApprovedBy(additive.getApprovedBy());
        dto.setStatus(additive.getStatus().toString());
        dto.setContractId(additive.getContract().getId().toString());
        return dto;
    }
}
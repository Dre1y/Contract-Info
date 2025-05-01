package com.getinfo.api.services;

import com.getinfo.api.DTOS.renegotiation.RenegotiationRequestDTO;
import com.getinfo.api.DTOS.renegotiation.RenegotiationResponseDTO;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.domain.renegotiation.Renegotiation;
import com.getinfo.api.repositories.ContractRepository;
import com.getinfo.api.repositories.RenegotiationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RenegotiationService {

    private final RenegotiationRepository renegotiationRepository;
    private final ContractRepository contractRepository;

    public RenegotiationResponseDTO create(RenegotiationRequestDTO dto) {
        Contract contract = contractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new EntityNotFoundException("Contrato não encontrado"));

        if (contract.getValidityEnd() != null && contract.getValidityEnd().isBefore(dto.getRenegotiationDate())) {
            throw new IllegalStateException("Contrato encerrado não permite repactuação.");
        }

        Renegotiation renegotiation = new Renegotiation();
        renegotiation.setRenegotiationType(dto.getRenegotiationType());
        renegotiation.setRenegotiationDate(dto.getRenegotiationDate());
        renegotiation.setDetails(dto.getDetails());
        renegotiation.setChangeReason(dto.getChangeReason());
        renegotiation.setResponsibleParties(dto.getResponsibleParties());
        renegotiation.setStatus(dto.getStatus());
        renegotiation.setApprovedBy(dto.getApprovedBy());
        renegotiation.setContract(contract);

        return toDTO(renegotiationRepository.save(renegotiation));
    }

    public List<RenegotiationResponseDTO> getAllByContract(UUID contractId) {
        return renegotiationRepository.findByContractId(contractId).stream()
                .map(this::toDTO)
                .toList();
    }

    private RenegotiationResponseDTO toDTO(Renegotiation renegotiation) {
        RenegotiationResponseDTO dto = new RenegotiationResponseDTO();
        dto.setId(renegotiation.getId().toString());
        dto.setRenegotiationType(renegotiation.getRenegotiationType());
        dto.setRenegotiationDate(renegotiation.getRenegotiationDate().toString());
        dto.setDetails(renegotiation.getDetails());
        dto.setChangeReason(renegotiation.getChangeReason());
        dto.setResponsibleParties(renegotiation.getResponsibleParties());
        dto.setStatus(renegotiation.getStatus().toString());
        dto.setApprovedBy(renegotiation.getApprovedBy());
        dto.setContractId(renegotiation.getContract().getId().toString());
        return dto;
    }
}
package com.getinfo.api.services;

import com.getinfo.api.DTOS.contract.ContractRequestDTO;
import com.getinfo.api.DTOS.contract.ContractResponseDTO;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.domain.contractor.Contractor;
import com.getinfo.api.repositories.AttachmentRepository;
import com.getinfo.api.repositories.ContractRepository;
import com.getinfo.api.repositories.ContractorRepository;
import com.getinfo.api.repositories.DeliverableRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContractService {

    private final ContractRepository contractRepository;
    private final ContractorRepository contractorRepository;
    private final AttachmentRepository attachmentRepository;
    private final DeliverableRepository deliverableRepository;

    public ContractResponseDTO create(ContractRequestDTO dto) {
        Contractor contractor = contractorRepository.findById(dto.getContractorId())
                .orElseThrow(() -> new EntityNotFoundException("Contractor not found"));

        Contract contract = new Contract();
        contract.setContractType(dto.getContractType());
        contract.setServiceType(dto.getServiceType());
        contract.setDescription(dto.getDescription());
        contract.setValidityStart(dto.getValidityStart());
        contract.setValidityEnd(dto.getValidityEnd());
        contract.setCompletionDate(dto.getCompletionDate());
        contract.setPaymentDueDate(dto.getPaymentDueDate());
        contract.setContractor(contractor);

        contract = contractRepository.save(contract);

        return toDTO(contract);
    }

    public ContractResponseDTO getById(UUID id) {
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contract not found"));
        return toDTO(contract);
    }

    public List<ContractResponseDTO> getAll() {
        return contractRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ContractResponseDTO update(UUID id, ContractRequestDTO dto) {

        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contract not found"));

        contract.setContractType(dto.getContractType());
        contract.setServiceType(dto.getServiceType());
        contract.setDescription(dto.getDescription());
        contract.setValidityStart(dto.getValidityStart());
        contract.setValidityEnd(dto.getValidityEnd());
        contract.setCompletionDate(dto.getCompletionDate());
        contract.setPaymentDueDate(dto.getPaymentDueDate());

        return toDTO(contractRepository.save(contract));
    }

    public void delete(UUID id) {
        contractRepository.deleteById(id);
    }

    private ContractResponseDTO toDTO(Contract contract) {
        ContractResponseDTO dto = new ContractResponseDTO();
        dto.setId(contract.getId() != null ? contract.getId().toString() : null);
        dto.setContractType(contract.getContractType().toString());
        dto.setServiceType(contract.getServiceType().toString());
        dto.setDescription(contract.getDescription());
        dto.setValidityStart(contract.getValidityStart() != null ? contract.getValidityStart().toString() : null);
        dto.setValidityEnd(contract.getValidityEnd() != null ? contract.getValidityEnd().toString() : null);
        dto.setContractorName(contract.getContractor() != null ? contract.getContractor().getName() : null);
        return dto;
    }
}


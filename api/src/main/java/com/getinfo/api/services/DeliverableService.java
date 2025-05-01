package com.getinfo.api.services;

import com.getinfo.api.DTOS.deliverable.DeliverableRequestDTO;
import com.getinfo.api.DTOS.deliverable.DeliverableResponseDTO;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.domain.deliverable.Deliverable;
import com.getinfo.api.repositories.ContractRepository;
import com.getinfo.api.repositories.DeliverableRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeliverableService {

    private final DeliverableRepository deliverableRepository;
    private final ContractRepository contractRepository;

    public DeliverableResponseDTO create(DeliverableRequestDTO dto) {
        Contract contract = contractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new EntityNotFoundException("Contrato não encontrado"));

        // Regra de negócio: contrato público requer ordem de serviço
        if ("PUBLICO".equalsIgnoreCase(contract.getContractType().toString()) && contract.getServiceOrder() == null) {
            throw new IllegalStateException("Contrato público exige Ordem de Serviço emitida para cadastrar entregáveis.");
        }

        Deliverable deliverable = new Deliverable();
        deliverable.setDescription(dto.getDescription());
        deliverable.setDueDate(dto.getDueDate());
        deliverable.setStatus(dto.getStatus());
        deliverable.setContract(contract);

        return toDTO(deliverableRepository.save(deliverable));
    }

    public List<DeliverableResponseDTO> getAll() {
        return deliverableRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public DeliverableResponseDTO update(UUID id, DeliverableRequestDTO dto) {
        Deliverable deliverable = deliverableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entregável não encontrado"));

        deliverable.setDescription(dto.getDescription());
        deliverable.setDueDate(dto.getDueDate());
        deliverable.setStatus(dto.getStatus());

        return toDTO(deliverableRepository.save(deliverable));
    }

    public void delete(UUID id) {
        deliverableRepository.deleteById(id);
    }

    private DeliverableResponseDTO toDTO(Deliverable deliverable) {
        DeliverableResponseDTO dto = new DeliverableResponseDTO();
        dto.setId(deliverable.getId().toString());
        dto.setDescription(deliverable.getDescription());
        dto.setDueDate(deliverable.getDueDate() != null ? deliverable.getDueDate().toString() : null);
        dto.setStatus(deliverable.getStatus().toString());
        dto.setContractId(deliverable.getContract().getId().toString());
        dto.setContractDescription(deliverable.getContract().getDescription());
        return dto;
    }
}
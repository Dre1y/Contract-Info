package com.getinfo.api.services;

import com.getinfo.api.DTOS.contractors.ContractorRequestDTO;
import com.getinfo.api.DTOS.contractors.ContractorResponseDTO;
import com.getinfo.api.domain.contractor.Contractor;
import com.getinfo.api.repositories.ContractorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContractorService {

    private final ContractorRepository contractorRepository;

    public ContractorResponseDTO create(ContractorRequestDTO dto) {
        Contractor contractor = new Contractor();
        contractor.setName(dto.getName());
        contractor.setCpfCnpj(dto.getCpfCnpj());
        contractor.setPhone(dto.getPhone());
        contractor.setCep(dto.getCep());
        contractor = contractorRepository.save(contractor);
        return toDTO(contractor);
    }

    public ContractorResponseDTO getById(UUID id) {
        return contractorRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Contractor not found"));
    }

    public List<ContractorResponseDTO> getAll() {
        return contractorRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ContractorResponseDTO update(UUID id, ContractorRequestDTO dto) {
        Contractor contractor = contractorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contractor not found"));
        contractor.setName(dto.getName());
        contractor.setCpfCnpj(dto.getCpfCnpj());
        contractor.setPhone(dto.getPhone());
        contractor.setCep(dto.getCep());
        contractor = contractorRepository.save(contractor);
        return toDTO(contractor);
    }

    public void delete(UUID id) {
        contractorRepository.deleteById(id);
    }

    private ContractorResponseDTO toDTO(Contractor contractor) {
        ContractorResponseDTO dto = new ContractorResponseDTO();
        dto.setId(contractor.getId());
        dto.setName(contractor.getName());
        dto.setCpfCnpj(contractor.getCpfCnpj());
        dto.setPhone(contractor.getPhone());
        dto.setCep(contractor.getCep());
        return dto;
    }
}


package com.getinfo.api.services;

import com.getinfo.api.DTOS.contractPosition.ContractPositionRequestDTO;
import com.getinfo.api.DTOS.contractPosition.ContractPositionResponseDTO;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.domain.contractPosition.ContractPosition;
import com.getinfo.api.domain.person.Person;
import com.getinfo.api.repositories.ContractPositionRepository;
import com.getinfo.api.repositories.ContractRepository;
import com.getinfo.api.repositories.PersonRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContractPositionService {

    private final ContractPositionRepository contractPositionRepository;
    private final ContractRepository contractRepository;
    private final PersonRepository personRepository;

    public ContractPositionResponseDTO create(ContractPositionRequestDTO dto) {
        Contract contract = contractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new EntityNotFoundException("Contrato não encontrado"));

        Person person = personRepository.findById(dto.getPersonId())
                .orElseThrow(() -> new EntityNotFoundException("Pessoa não encontrada"));

        ContractPosition position = new ContractPosition();
        position.setPosition(dto.getPosition());
        position.setPositionDescription(dto.getPositionDescription());
        position.setQuantity(dto.getQuantity());
        position.setContract(contract);
        position.setPerson(person);

        return toDTO(contractPositionRepository.save(position));
    }

    public List<ContractPositionResponseDTO> getAll() {
        return contractPositionRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ContractPositionResponseDTO update(UUID id, ContractPositionRequestDTO dto) {
        ContractPosition position = contractPositionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Posto de serviço não encontrado"));

        if (dto.getContractId() != null) {
            Contract contract = contractRepository.findById(dto.getContractId())
                    .orElseThrow(() -> new EntityNotFoundException("Contrato não encontrado"));
            position.setContract(contract);
        }

        if (dto.getPersonId() != null) {
            Person person = personRepository.findById(dto.getPersonId())
                    .orElseThrow(() -> new EntityNotFoundException("Pessoa não encontrada"));
            position.setPerson(person);
        }

        position.setPosition(dto.getPosition());
        position.setPositionDescription(dto.getPositionDescription());
        position.setQuantity(dto.getQuantity());

        return toDTO(contractPositionRepository.save(position));
    }

    public void delete(UUID id) {
        contractPositionRepository.deleteById(id);
    }

    private ContractPositionResponseDTO toDTO(ContractPosition position) {
        ContractPositionResponseDTO dto = new ContractPositionResponseDTO();
        dto.setId(position.getId().toString());
        dto.setPosition(position.getPosition());
        dto.setPositionDescription(position.getPositionDescription());
        dto.setQuantity(position.getQuantity() != null ? position.getQuantity().toString() : null);
        dto.setContractId(position.getContract().getId().toString());
        dto.setPersonId(position.getPerson().getId().toString());
        dto.setPersonName(position.getPerson().getName());
        return dto;
    }
}
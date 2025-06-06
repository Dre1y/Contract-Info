package com.getinfo.api.services;

import com.getinfo.api.DTOS.person.PersonRequestDTO;
import com.getinfo.api.DTOS.person.PersonResponseDTO;
import com.getinfo.api.domain.person.Person;
import com.getinfo.api.repositories.PersonRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;

    public PersonResponseDTO create(PersonRequestDTO dto) {
        Person person = new Person();
        person.setName(dto.getName());
        person.setCpfCnpj(dto.getCpfCnpj());
        person.setRg(dto.getRg());
        person.setEmail(dto.getEmail());
        person.setPhone(dto.getPhone());
        person.setAddress(dto.getAddress());
        person = personRepository.save(person);
        return toDTO(person);
    }

    public PersonResponseDTO getById(UUID id) {
        return personRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Pessoa não encontrada"));
    }

    public List<PersonResponseDTO> getAll() {
        return personRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public PersonResponseDTO update(UUID id, PersonRequestDTO dto) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pessoa não encontrada"));
        person.setName(dto.getName());
        person.setCpfCnpj(dto.getCpfCnpj());
        person.setRg(dto.getRg());
        person.setEmail(dto.getEmail());
        person.setPhone(dto.getPhone());
        person.setAddress(dto.getAddress());
        return toDTO(person);
    }

    public void delete(UUID id) {
        personRepository.deleteById(id);
    }

    private PersonResponseDTO toDTO(Person person) {
        PersonResponseDTO dto = new PersonResponseDTO();
        dto.setId(person.getId());
        dto.setName(person.getName());
        dto.setCpfCnpj(person.getCpfCnpj());
        dto.setRg(person.getRg());
        dto.setEmail(person.getEmail());
        dto.setPhone(person.getPhone());
        dto.setAddress(person.getAddress());
        return dto;
    }

    private Person toEntity(PersonRequestDTO dto) {
        Person person = new Person();
        person.setName(dto.getName());
        person.setCpfCnpj(dto.getCpfCnpj());
        person.setRg(dto.getRg());
        person.setEmail(dto.getEmail());
        person.setPhone(dto.getPhone());
        person.setAddress(dto.getAddress());
        return person;
    }
}
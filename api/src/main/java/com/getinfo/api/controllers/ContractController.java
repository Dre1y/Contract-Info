package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.contract.ContractRequestDTO;
import com.getinfo.api.DTOS.contract.ContractResponseDTO;
import com.getinfo.api.services.ContractService;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping
    public ResponseEntity<ContractResponseDTO> create(@RequestBody @Validated ContractRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contractService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(contractService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractResponseDTO>> getAll() {
        return ResponseEntity.ok(contractService.getAll());
    }

    @GetMapping("/ids")
    public ResponseEntity<List<UUID>> getAllIds() {
        return ResponseEntity.ok(contractService.getAllIds());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractResponseDTO> update(@PathVariable UUID id, @RequestBody @Validated ContractRequestDTO dto) {
        return ResponseEntity.ok(contractService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        contractService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{CPF-CNPJ}")
    public ResponseEntity<ContractResponseDTO> getByCPF_CNPJ(@PathVariable UUID CPF_CNPJ) {
        return ResponseEntity.ok(contractService.getByCPF_CNPJ(CPF_CNPJ));
    }

    @PutMapping("/{CPF-CNPJ}")
    public ResponseEntity<ContractResponseDTO> updateByCPF_CNPJ(@PathVariable UUID CPF_CNPJ, @RequestBody @Validated ContractRequestDTO dto) {
        return ResponseEntity.ok(contractService.updateByCPF_CNPJ(CPF_CNPJ, dto));
    }

    @DeleteMapping("/{CPF-CNPJ}")
    public ResponseEntity<Void> deleteByCPF_CNPJ(@PathVariable UUID CPF_CNPJ) {
        contractService.deleteByCPF_CNPJ(CPF_CNPJ);
        return ResponseEntity.noContent().build();
    }


}




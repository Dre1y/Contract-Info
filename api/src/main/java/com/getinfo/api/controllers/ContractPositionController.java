package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.contractPosition.ContractPositionRequestDTO;
import com.getinfo.api.DTOS.contractPosition.ContractPositionResponseDTO;
import com.getinfo.api.services.ContractPositionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contract-positions")
@RequiredArgsConstructor
@Tag(name = "Cargo no Contrato", description = "Controlador responsável pelos cargos no contrato")
public class ContractPositionController {

    private final ContractPositionService contractPositionService;

    @PostMapping
    public ResponseEntity<ContractPositionResponseDTO> create(@RequestBody ContractPositionRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contractPositionService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ContractPositionResponseDTO>> getAll() {
        return ResponseEntity.ok(contractPositionService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractPositionResponseDTO> update(@PathVariable UUID id, @RequestBody ContractPositionRequestDTO dto) {
        return ResponseEntity.ok(contractPositionService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        contractPositionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
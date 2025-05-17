package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.contractors.ContractorRequestDTO;
import com.getinfo.api.DTOS.contractors.ContractorResponseDTO;
import com.getinfo.api.services.ContractorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/contractors")
@RequiredArgsConstructor
@Tag(name = "Contratante", description = "Controlador responsável pelos contratantes")
public class ContractorController {

    private final ContractorService contractorService;

    @PostMapping
    public ResponseEntity<ContractorResponseDTO> create(@RequestBody @Validated ContractorRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contractorService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractorResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(contractorService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractorResponseDTO>> getAll() {
        return ResponseEntity.ok(contractorService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractorResponseDTO> update(@PathVariable UUID id, @RequestBody @Validated ContractorRequestDTO dto) {
        return ResponseEntity.ok(contractorService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        contractorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.renegotiation.RenegotiationRequestDTO;
import com.getinfo.api.DTOS.renegotiation.RenegotiationResponseDTO;
import com.getinfo.api.services.RenegotiationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/renegotiations")
@RequiredArgsConstructor
@Tag(name = "Renegociação", description = "Controlador responsável pelas renegociações")
public class RenegotiationController {

    private final RenegotiationService renegotiationService;

    @PostMapping
    public ResponseEntity<RenegotiationResponseDTO> create(@RequestBody RenegotiationRequestDTO dto) {
        return ResponseEntity.status(201).body(renegotiationService.create(dto));
    }

    @GetMapping("/contract/{contractId}")
    public ResponseEntity<List<RenegotiationResponseDTO>> getAllByContract(@PathVariable UUID contractId) {
        return ResponseEntity.ok(renegotiationService.getAllByContract(contractId));
    }
}
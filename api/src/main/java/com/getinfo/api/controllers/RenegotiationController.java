package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.renegotiation.RenegotiationRequestDTO;
import com.getinfo.api.DTOS.renegotiation.RenegotiationResponseDTO;
import com.getinfo.api.services.RenegotiationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/renegotiations")
@RequiredArgsConstructor
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
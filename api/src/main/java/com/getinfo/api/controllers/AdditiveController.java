package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.additive.AdditiveRequestDTO;
import com.getinfo.api.DTOS.additive.AdditiveResponseDTO;
import com.getinfo.api.services.AdditiveService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/additives")
@RequiredArgsConstructor
@Tag(name = "Aditivo", description = "Controlador responsável pelos aditivos")
public class AdditiveController {

    private final AdditiveService additiveService;

    @PostMapping
    public ResponseEntity<AdditiveResponseDTO> create(@RequestBody AdditiveRequestDTO dto) {
        return ResponseEntity.status(201).body(additiveService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<AdditiveResponseDTO>> getAll() {
        return ResponseEntity.ok(additiveService.getAll());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<AdditiveResponseDTO> approve(@PathVariable UUID id, @RequestParam String approver) {
        return ResponseEntity.ok(additiveService.approve(id, approver));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<AdditiveResponseDTO> reject(@PathVariable UUID id, @RequestParam String approver) {
        return ResponseEntity.ok(additiveService.reject(id, approver));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        additiveService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

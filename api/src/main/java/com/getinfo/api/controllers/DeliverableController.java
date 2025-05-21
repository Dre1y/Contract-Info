package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.deliverable.DeliverableRequestDTO;
import com.getinfo.api.DTOS.deliverable.DeliverableResponseDTO;
import com.getinfo.api.services.DeliverableService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/deliverables")
@RequiredArgsConstructor
@Tag(name = "Entregáveis", description = "Controlador responsável pelos entregáveis")
public class DeliverableController {

    private final DeliverableService deliverableService;

    @PostMapping
    public ResponseEntity<DeliverableResponseDTO> create(@RequestBody DeliverableRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deliverableService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<DeliverableResponseDTO>> getAll() {
        return ResponseEntity.ok(deliverableService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliverableResponseDTO> update(@PathVariable UUID id, @RequestBody DeliverableRequestDTO dto) {
        return ResponseEntity.ok(deliverableService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        deliverableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

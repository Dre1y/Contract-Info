package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.serviceOrder.ServiceOrderRequestDTO;
import com.getinfo.api.DTOS.serviceOrder.ServiceOrderResponseDTO;
import com.getinfo.api.services.ServiceOrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/service-orders")
@RequiredArgsConstructor
@Tag(name = "Ordem de Serviço", description = "Controlador responsável pelas ordens de serviço")
public class ServiceOrderController {

    private final ServiceOrderService serviceOrderService;

    @PostMapping
    public ResponseEntity<ServiceOrderResponseDTO> create(@RequestBody @Validated ServiceOrderRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceOrderService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceOrderResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceOrderService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ServiceOrderResponseDTO>> getAll() {
        return ResponseEntity.ok(serviceOrderService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceOrderResponseDTO> update(@PathVariable UUID id, @RequestBody @Validated ServiceOrderRequestDTO dto) {
        return ResponseEntity.ok(serviceOrderService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        serviceOrderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
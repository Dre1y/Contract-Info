package com.getinfo.api.controllers;

import com.getinfo.api.DTOS.attachment.AttachmentRequestDTO;
import com.getinfo.api.DTOS.attachment.AttachmentResponseDTO;
import com.getinfo.api.services.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/attachments")
@RequiredArgsConstructor
public class AttachmentController {

    private final AttachmentService attachmentService;

    @PostMapping
    public ResponseEntity<AttachmentResponseDTO> create(@RequestBody AttachmentRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(attachmentService.create(dto));
    }

    @GetMapping("/contract/{contractId}")
    public ResponseEntity<List<AttachmentResponseDTO>> getByContract(@PathVariable UUID contractId) {
        return ResponseEntity.ok(attachmentService.getAllByContract(contractId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        attachmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
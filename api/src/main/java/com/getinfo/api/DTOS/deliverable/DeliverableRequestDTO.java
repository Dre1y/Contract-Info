package com.getinfo.api.DTOS.deliverable;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;

import com.getinfo.api.enums.Status;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public class DeliverableRequestDTO {
    @NotBlank(message = "Descrição do entregável é obrigatória")
    private String description;

    @Future(message = "Data de entrega deve ser futura")
    private LocalDate dueDate;

    @NotNull(message = "Status é obrigatório")
    private Status status;
    private UUID contractId;
    private UUID attachmentId;

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public UUID getContractId() { return contractId; }
    public void setContractId(UUID contractId) { this.contractId = contractId; }

    public UUID getAttachmentId() { return attachmentId; }
    public void setAttachmentId(UUID attachmentId) { this.attachmentId = attachmentId; }
}
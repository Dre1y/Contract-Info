package com.getinfo.api.DTOS.renegotiation;

import com.getinfo.api.enums.Status;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public class RenegotiationRequestDTO {
    private String renegotiationType;
    private LocalDate renegotiationDate;
    private String details;
    private String changeReason;
    private String responsibleParties;
    @NotNull(message = "Status é obrigatório")
    private Status status;
    private String approvedBy;
    private UUID contractId;
    private UUID attachmentId;

    public String getRenegotiationType() { return renegotiationType; }
    public void setRenegotiationType(String renegotiationType) { this.renegotiationType = renegotiationType; }

    public LocalDate getRenegotiationDate() { return renegotiationDate; }
    public void setRenegotiationDate(LocalDate renegotiationDate) { this.renegotiationDate = renegotiationDate; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getChangeReason() { return changeReason; }
    public void setChangeReason(String changeReason) { this.changeReason = changeReason; }

    public String getResponsibleParties() { return responsibleParties; }
    public void setResponsibleParties(String responsibleParties) { this.responsibleParties = responsibleParties; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public UUID getContractId() { return contractId; }
    public void setContractId(UUID contractId) { this.contractId = contractId; }

    public UUID getAttachmentId() { return attachmentId; }
    public void setAttachmentId(UUID attachmentId) { this.attachmentId = attachmentId; }
}
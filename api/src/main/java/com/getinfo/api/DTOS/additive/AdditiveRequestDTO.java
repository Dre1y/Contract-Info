package com.getinfo.api.DTOS.additive;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import com.getinfo.api.enums.AdditiveType;
import com.getinfo.api.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public class AdditiveRequestDTO {
    @NotNull(message = "Tipo de aditivo é obrigatório")
    private AdditiveType additiveType;

    @NotNull(message = "Valor ajustado é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "Valor deve ser positivo")
    private BigDecimal adjustedValue;

    @Future(message = "Prazo estendido deve ser no futuro")
    private LocalDate extendedDeadline;
    private String details;

    @NotBlank(message = "Motivo da alteração é obrigatório")
    private String changeReason;
    private String approvedBy;
    @NotNull(message = "Status é obrigatório")
    private Status status;
    private UUID contractId;
    private UUID attachmentId;

    public AdditiveType getAdditiveType() { return additiveType; }
    public void setAdditiveType(AdditiveType additiveType) { this.additiveType = additiveType; }

    public BigDecimal getAdjustedValue() { return adjustedValue; }
    public void setAdjustedValue(BigDecimal adjustedValue) { this.adjustedValue = adjustedValue; }

    public LocalDate getExtendedDeadline() { return extendedDeadline; }
    public void setExtendedDeadline(LocalDate extendedDeadline) { this.extendedDeadline = extendedDeadline; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getChangeReason() { return changeReason; }
    public void setChangeReason(String changeReason) { this.changeReason = changeReason; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public UUID getContractId() { return contractId; }
    public void setContractId(UUID contractId) { this.contractId = contractId; }

    public UUID getAttachmentId() { return attachmentId; }
    public void setAttachmentId(UUID attachmentId) { this.attachmentId = attachmentId; }
}
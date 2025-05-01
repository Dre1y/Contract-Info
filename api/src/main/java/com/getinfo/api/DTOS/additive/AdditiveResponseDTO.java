package com.getinfo.api.DTOS.additive;

public class AdditiveResponseDTO {
    private String id;
    private String additiveType;
    private String adjustedValue;
    private String extendedDeadline;
    private String details;
    private String changeReason;
    private String approvedBy;
    private String status;
    private String contractId;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAdditiveType() { return additiveType; }
    public void setAdditiveType(String additiveType) { this.additiveType = additiveType; }

    public String getAdjustedValue() { return adjustedValue; }
    public void setAdjustedValue(String adjustedValue) { this.adjustedValue = adjustedValue; }

    public String getExtendedDeadline() { return extendedDeadline; }
    public void setExtendedDeadline(String extendedDeadline) { this.extendedDeadline = extendedDeadline; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getChangeReason() { return changeReason; }
    public void setChangeReason(String changeReason) { this.changeReason = changeReason; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getContractId() { return contractId; }
    public void setContractId(String contractId) { this.contractId = contractId; }
}

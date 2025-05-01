package com.getinfo.api.DTOS.renegotiation;

public class RenegotiationResponseDTO {
    private String id;
    private String renegotiationType;
    private String renegotiationDate;
    private String details;
    private String changeReason;
    private String responsibleParties;
    private String status;
    private String approvedBy;
    private String contractId;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRenegotiationType() { return renegotiationType; }
    public void setRenegotiationType(String renegotiationType) { this.renegotiationType = renegotiationType; }

    public String getRenegotiationDate() { return renegotiationDate; }
    public void setRenegotiationDate(String renegotiationDate) { this.renegotiationDate = renegotiationDate; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getChangeReason() { return changeReason; }
    public void setChangeReason(String changeReason) { this.changeReason = changeReason; }

    public String getResponsibleParties() { return responsibleParties; }
    public void setResponsibleParties(String responsibleParties) { this.responsibleParties = responsibleParties; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public String getContractId() { return contractId; }
    public void setContractId(String contractId) { this.contractId = contractId; }
}
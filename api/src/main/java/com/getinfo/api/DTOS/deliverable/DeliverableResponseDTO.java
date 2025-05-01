package com.getinfo.api.DTOS.deliverable;

public class DeliverableResponseDTO {
    private String id;
    private String description;
    private String dueDate;
    private String status;
    private String contractId;
    private String contractDescription;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getContractId() { return contractId; }
    public void setContractId(String contractId) { this.contractId = contractId; }

    public String getContractDescription() { return contractDescription; }
    public void setContractDescription(String contractDescription) { this.contractDescription = contractDescription; }
}
package com.getinfo.api.DTOS.contract;

import java.time.LocalDate;
import java.util.UUID;

public class ContractResponseDTO {
    private String id;
    private String contractType;
    private String serviceType;
    private String description;
    private String validityStart;
    private String validityEnd;
    private String contractorName;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getContractType() { return contractType; }
    public void setContractType(String contractType) { this.contractType = contractType; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getValidityStart() { return validityStart; }
    public void setValidityStart(String validityStart) { this.validityStart = validityStart; }

    public String getValidityEnd() { return validityEnd; }
    public void setValidityEnd(String validityEnd) { this.validityEnd = validityEnd; }

    public String getContractorName() { return contractorName; }
    public void setContractorName(String contractorName) { this.contractorName = contractorName; }
}


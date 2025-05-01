package com.getinfo.api.DTOS.serviceOrder;

public class ServiceOrderResponseDTO {
    private String id;
    private String serviceOrderNumber;
    private String serviceOrderDescription;
    private String serviceOrderType;
    private String status;
    private String startDate;
    private String resource;
    private String resourceDescription;
    private String contractId;
    private String attachmentId;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getServiceOrderNumber() { return serviceOrderNumber; }
    public void setServiceOrderNumber(String serviceOrderNumber) { this.serviceOrderNumber = serviceOrderNumber; }

    public String getServiceOrderDescription() { return serviceOrderDescription; }
    public void setServiceOrderDescription(String serviceOrderDescription) { this.serviceOrderDescription = serviceOrderDescription; }

    public String getServiceOrderType() { return serviceOrderType; }
    public void setServiceOrderType(String serviceOrderType) { this.serviceOrderType = serviceOrderType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getResource() { return resource; }
    public void setResource(String resource) { this.resource = resource; }

    public String getResourceDescription() { return resourceDescription; }
    public void setResourceDescription(String resourceDescription) { this.resourceDescription = resourceDescription; }

    public String getContractId() { return contractId; }
    public void setContractId(String contractId) { this.contractId = contractId; }

    public String getAttachmentId() { return attachmentId; }
    public void setAttachmentId(String attachmentId) { this.attachmentId = attachmentId; }
}
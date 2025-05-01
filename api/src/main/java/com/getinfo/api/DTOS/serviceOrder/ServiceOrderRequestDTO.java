package com.getinfo.api.DTOS.serviceOrder;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.getinfo.api.enums.Status;
import com.getinfo.api.enums.ServiceOrderType;

import java.time.LocalDate;
import java.util.UUID;

public class ServiceOrderRequestDTO {
    @NotBlank(message = "Número da OS é obrigatório")
    private String serviceOrderNumber;

    @NotBlank(message = "Descrição da OS é obrigatória")
    private String serviceOrderDescription;

    @NotNull(message = "Tipo da ordem de serviço é obrigatório")
    private ServiceOrderType serviceOrderType;

    @NotNull(message = "Data de início é obrigatória")
    @FutureOrPresent(message = "Data de início deve ser hoje ou no futuro")
    private LocalDate startDate;
    private String resource;
    private String resourceDescription;
    private UUID contractId;
    private UUID attachmentId;
    @NotNull(message = "Status é obrigatório")
    private Status status;

    public String getServiceOrderNumber() { return serviceOrderNumber; }
    public void setServiceOrderNumber(String serviceOrderNumber) { this.serviceOrderNumber = serviceOrderNumber; }

    public String getServiceOrderDescription() { return serviceOrderDescription; }
    public void setServiceOrderDescription(String serviceOrderDescription) { this.serviceOrderDescription = serviceOrderDescription; }

    public ServiceOrderType getServiceOrderType() { return serviceOrderType; }
    public void setServiceOrderType(ServiceOrderType serviceOrderType) { this.serviceOrderType = serviceOrderType; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public String getResource() { return resource; }
    public void setResource(String resource) { this.resource = resource; }

    public String getResourceDescription() { return resourceDescription; }
    public void setResourceDescription(String resourceDescription) { this.resourceDescription = resourceDescription; }

    public UUID getContractId() { return contractId; }
    public void setContractId(UUID contractId) { this.contractId = contractId; }

    public UUID getAttachmentId() { return attachmentId; }
    public void setAttachmentId(UUID attachmentId) { this.attachmentId = attachmentId; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
package com.getinfo.api.DTOS.contract;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.getinfo.api.enums.ContractType;
import com.getinfo.api.enums.ServiceType;

import java.time.LocalDate;
import java.util.UUID;

public class ContractRequestDTO {

    @NotNull(message = "Tipo de contrato é obrigatório")
    private ContractType contractType;

    @NotNull(message = "Tipo de serviço é obrigatório")
    private ServiceType serviceType;

    @NotBlank(message = "Descrição é obrigatória")
    private String description;

    @NotNull(message = "Data de início da vigência é obrigatória")
    @FutureOrPresent(message = "Data de início deve ser presente ou futura")
    private LocalDate validityStart;

    @NotNull(message = "Data de fim da vigência é obrigatória")
    @Future(message = "Data de fim deve ser no futuro")
    private LocalDate validityEnd;
    private LocalDate completionDate;
    private LocalDate paymentDueDate;
    private UUID contractorId;
    private UUID deliverableId;
    private UUID attachmentId;
    private UUID contractorCPF_CNPJ;

    public ContractType getContractType() { return contractType; }
    public void setContractType(ContractType contractType) { this.contractType = contractType; }

    public ServiceType getServiceType() { return serviceType; }
    public void setServiceType(ServiceType serviceType) { this.serviceType = serviceType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getValidityStart() { return validityStart; }
    public void setValidityStart(LocalDate validityStart) { this.validityStart = validityStart; }

    public LocalDate getValidityEnd() { return validityEnd; }
    public void setValidityEnd(LocalDate validityEnd) { this.validityEnd = validityEnd; }

    public LocalDate getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDate completionDate) { this.completionDate = completionDate; }

    public LocalDate getPaymentDueDate() { return paymentDueDate; }
    public void setPaymentDueDate(LocalDate paymentDueDate) { this.paymentDueDate = paymentDueDate; }

    public UUID getContractorId() { return contractorId; }
    public void setContractorId(UUID contractorId) { this.contractorId = contractorId; }

    public UUID getDeliverableId() { return deliverableId; }
    public void setDeliverableId(UUID deliverableId) { this.deliverableId = deliverableId; }

    public UUID getAttachmentId() { return attachmentId; }
    public void setAttachmentId(UUID attachmentId) { this.attachmentId = attachmentId; }
    
    public UUID getContractorCPF_CNPJ(){ return contractorCPF_CNPJ; }
    public void setContractorCPF_CNPJ(UUID contractorCPF_CNPJ){ 
        this.contractorCPF_CNPJ = contractorCPF_CNPJ;
    }

}


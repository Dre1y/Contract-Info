package com.getinfo.api.services;

import com.getinfo.api.DTOS.serviceOrder.ServiceOrderRequestDTO;
import com.getinfo.api.DTOS.serviceOrder.ServiceOrderResponseDTO;
import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.domain.serviceOrder.ServiceOrder;
import com.getinfo.api.enums.Status;
import com.getinfo.api.repositories.ServiceOrderRepository;
import com.getinfo.api.repositories.ContractRepository;
import com.getinfo.api.repositories.AttachmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceOrderService {

    private final ServiceOrderRepository serviceOrderRepository;
    private final ContractRepository contractRepository;
    private final AttachmentRepository attachmentRepository;

    public ServiceOrderResponseDTO create(ServiceOrderRequestDTO dto) {
        Contract contract = contractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new EntityNotFoundException("Contract not found"));

        Attachment attachment = attachmentRepository.findById(dto.getAttachmentId())
                .orElseThrow(() -> new EntityNotFoundException("Attachment not found"));

        ServiceOrder serviceOrder = new ServiceOrder();
        serviceOrder.setServiceOrderNumber(dto.getServiceOrderNumber());
        serviceOrder.setServiceOrderDescription(dto.getServiceOrderDescription());
        serviceOrder.setServiceOrderType(dto.getServiceOrderType());
        serviceOrder.setStatus(Status.PENDENTE); // Default status
        serviceOrder.setStartDate(dto.getStartDate());
        serviceOrder.setResource(dto.getResource());
        serviceOrder.setResourceDescription(dto.getResourceDescription());
        serviceOrder.setContract(contract);
        serviceOrder.setAttachment(attachment);

        serviceOrder = serviceOrderRepository.save(serviceOrder);

        // Send notification about critical deadline
        // This is a placeholder for your notification logic

        return toDTO(serviceOrder);
    }

    public ServiceOrderResponseDTO getById(UUID id) {
        ServiceOrder serviceOrder = serviceOrderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Service Order not found"));
        return toDTO(serviceOrder);
    }

    public List<ServiceOrderResponseDTO> getAll() {
        return serviceOrderRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ServiceOrderResponseDTO update(UUID id, ServiceOrderRequestDTO dto) {
        ServiceOrder serviceOrder = serviceOrderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Service Order not found"));

        serviceOrder.setServiceOrderNumber(dto.getServiceOrderNumber());
        serviceOrder.setServiceOrderDescription(dto.getServiceOrderDescription());
        serviceOrder.setServiceOrderType(dto.getServiceOrderType());
        serviceOrder.setStatus(dto.getStatus());
        serviceOrder.setStartDate(dto.getStartDate());
        serviceOrder.setResource(dto.getResource());
        serviceOrder.setResourceDescription(dto.getResourceDescription());

        return toDTO(serviceOrderRepository.save(serviceOrder));
    }

    public void delete(UUID id) {
        serviceOrderRepository.deleteById(id);
    }

    private ServiceOrderResponseDTO toDTO(ServiceOrder serviceOrder) {
        ServiceOrderResponseDTO dto = new ServiceOrderResponseDTO();
        dto.setId(serviceOrder.getId().toString());
        dto.setServiceOrderNumber(serviceOrder.getServiceOrderNumber());
        dto.setServiceOrderDescription(serviceOrder.getServiceOrderDescription());
        dto.setServiceOrderType(serviceOrder.getServiceOrderType().toString());
        dto.setStatus(serviceOrder.getStatus().toString());
        dto.setStartDate(serviceOrder.getStartDate().toString());
        dto.setResource(serviceOrder.getResource());
        dto.setResourceDescription(serviceOrder.getResourceDescription());
        dto.setContractId(serviceOrder.getContract().getId().toString());
        dto.setAttachmentId(serviceOrder.getAttachment().getId().toString());
        return dto;
    }
}
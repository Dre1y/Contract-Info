package com.getinfo.api.DTOS.attachment;

import java.util.UUID;

import com.getinfo.api.enums.AttachmentType;
import jakarta.validation.constraints.NotNull;

public class AttachmentRequestDTO {
    @NotNull(message = "Tipo de anexo é obrigatório")
    private AttachmentType attachmentType;
    private String attachedUrl;
    private String deliverablesUrl;
    private UUID contractId;

    public AttachmentType getAttachmentType() { return attachmentType; }
    public void setAttachmentType(AttachmentType attachmentType) { this.attachmentType = attachmentType; }

    public String getAttachedUrl() { return attachedUrl; }
    public void setAttachedUrl(String attachedUrl) { this.attachedUrl = attachedUrl; }

    public String getDeliverablesUrl() { return deliverablesUrl; }
    public void setDeliverablesUrl(String deliverablesUrl) { this.deliverablesUrl = deliverablesUrl; }

    public UUID getContractId() { return contractId; }
    public void setContractId(UUID contractId) { this.contractId = contractId; }
}
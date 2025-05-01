package com.getinfo.api.DTOS.attachment;

import java.util.UUID;

public class AttachmentResponseDTO {
    private UUID id;
    private String attachmentType;
    private String attachedUrl;
    private String deliverablesUrl;
    private UUID contractId;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getAttachmentType() { return attachmentType; }
    public void setAttachmentType(String attachmentType) { this.attachmentType = attachmentType; }

    public String getAttachedUrl() { return attachedUrl; }
    public void setAttachedUrl(String attachedUrl) { this.attachedUrl = attachedUrl; }

    public String getDeliverablesUrl() { return deliverablesUrl; }
    public void setDeliverablesUrl(String deliverablesUrl) { this.deliverablesUrl = deliverablesUrl; }

    public UUID getContractId() { return contractId; }
    public void setContractId(UUID contractId) { this.contractId = contractId; }
}
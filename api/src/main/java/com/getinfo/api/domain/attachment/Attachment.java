package com.getinfo.api.domain.attachment;

import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.enums.AttachmentType;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Table(name = "attachment")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attachment {
    @Id @GeneratedValue
    private UUID id;
    @Enumerated(EnumType.STRING)
    private AttachmentType attachmentType;
    private String attachedUrl;
    private String deliverablesUrl;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;
}
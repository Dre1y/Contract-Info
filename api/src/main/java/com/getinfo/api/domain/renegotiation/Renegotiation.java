package com.getinfo.api.domain.renegotiation;

import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "renegotiation")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Renegotiation {
    @Id @GeneratedValue
    private UUID id;
    private String renegotiationType;
    private LocalDate renegotiationDate;
    private String details;
    private String changeReason;
    private String responsibleParties;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String approvedBy;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @OneToOne
    @JoinColumn(name = "attachment_id")
    private Attachment attachment;
}
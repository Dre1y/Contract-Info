package com.getinfo.api.domain.contractAmendment;

import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contract.Contract;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "contractAmendment")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractAmendment {
    @Id @GeneratedValue
    private UUID id;
    private String amendmentType;
    private LocalDate amendmentDate;
    private String details;
    private String approvedBy;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @OneToOne
    @JoinColumn(name = "attachment_id")
    private Attachment attachment;
}

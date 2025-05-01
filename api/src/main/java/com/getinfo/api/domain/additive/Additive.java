package com.getinfo.api.domain.additive;

import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.enums.AdditiveType;
import com.getinfo.api.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "additive")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Additive {
    @Id @GeneratedValue
    private UUID id;
    @Enumerated(EnumType.STRING)
    private AdditiveType additiveType;
    private BigDecimal adjustedValue;
    private LocalDate extendedDeadline;
    private String details;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String changeReason;
    private String approvedBy;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @OneToOne
    @JoinColumn(name = "attachment_id")
    private Attachment attachment;
}

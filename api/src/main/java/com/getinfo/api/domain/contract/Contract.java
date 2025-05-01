package com.getinfo.api.domain.contract;

import com.getinfo.api.domain.additive.Additive;
import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contractAmendment.ContractAmendment;
import com.getinfo.api.domain.contractPosition.ContractPosition;
import com.getinfo.api.domain.contractor.Contractor;
import com.getinfo.api.domain.deliverable.Deliverable;
import com.getinfo.api.domain.renegotiation.Renegotiation;
import com.getinfo.api.domain.serviceOrder.ServiceOrder;
import com.getinfo.api.enums.ContractType;
import com.getinfo.api.enums.ServiceType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Table(name = "contract")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contract {
    @Id @GeneratedValue
    private UUID id;
    @Enumerated(EnumType.STRING)
    private ContractType contractType;
    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;
    private String description;
    private LocalDate validityStart;
    private LocalDate validityEnd;
    private LocalDate completionDate;
    private LocalDate paymentDueDate;

    @ManyToOne
    @JoinColumn(name = "contractor_id")
    private Contractor contractor;

    @OneToOne
    @JoinColumn(name = "additive_id")
    private Additive additive;

    @OneToOne
    @JoinColumn(name = "deliverable_id")
    private Deliverable deliverable;

    @OneToOne
    @JoinColumn(name = "service_order_id")
    private ServiceOrder serviceOrder;

    @OneToMany
    @JoinColumn(name = "contract_id")
    private List<Attachment> attachments;

    @OneToMany(mappedBy = "contract")
    private List<ContractAmendment> amendments;

    @OneToMany(mappedBy = "contract")
    private List<Renegotiation> renegotiations;

    @OneToMany(mappedBy = "contract")
    private List<ContractPosition> contractPositions;
}

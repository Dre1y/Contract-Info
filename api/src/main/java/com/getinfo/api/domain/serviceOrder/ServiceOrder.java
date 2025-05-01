package com.getinfo.api.domain.serviceOrder;

import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.enums.ServiceOrderType;
import com.getinfo.api.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "serviceOrder")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceOrder {
    @Id @GeneratedValue
    private UUID id;
    private String serviceOrderNumber;
    private String serviceOrderDescription;
    @Enumerated(EnumType.STRING)
    private ServiceOrderType serviceOrderType;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate startDate;
    private String resource;
    private String resourceDescription;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @OneToOne
    @JoinColumn(name = "attachment_id")
    private Attachment attachment;
}
package com.getinfo.api.domain.deliverable;

import com.getinfo.api.domain.attachment.Attachment;
import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "deliverable")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Deliverable {
    @Id @GeneratedValue
    private UUID id;
    private String description;
    private LocalDate dueDate;
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @OneToOne
    @JoinColumn(name = "attachment_id")
    private Attachment attachment;
}

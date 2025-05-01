package com.getinfo.api.domain.contractPosition;

import com.getinfo.api.domain.contract.Contract;
import com.getinfo.api.domain.person.Person;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Table(name = "contractPosition")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractPosition {
    @Id @GeneratedValue
    private UUID id;
    private String position;
    private String positionDescription;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;
}

package com.getinfo.api.domain.person;

import com.getinfo.api.domain.contractPosition.ContractPosition;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Table(name = "person")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    @Id @GeneratedValue
    private UUID id;
    private String name;
    private String cpfCnpj;
    private String rg;
    private String email;
    private String phone;
    private String address;

    @OneToMany(mappedBy = "person")
    private List<ContractPosition> contractPositions;
}

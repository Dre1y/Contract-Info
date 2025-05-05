package com.getinfo.api.domain.contractor;

import com.getinfo.api.domain.contract.Contract;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Table(name = "contractor")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contractor {
    @Id @GeneratedValue
    private UUID id;
    private String name;
    private String CPF_CNPJ;
    private String phone;
    private String cep;

    @OneToMany(mappedBy = "contractor")
    private List<Contract> contracts;
}
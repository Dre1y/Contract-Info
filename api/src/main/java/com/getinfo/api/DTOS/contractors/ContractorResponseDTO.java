package com.getinfo.api.DTOS.contractors;

import java.util.UUID;

public class ContractorResponseDTO {
    private UUID id;
    private String name;
    private String cpfCnpj;
    private String phone;
    private String cep;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCpfCnpj() { return cpfCnpj; }
    public void setCpfCnpj(String cpfCnpj) { this.cpfCnpj = cpfCnpj; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }
}
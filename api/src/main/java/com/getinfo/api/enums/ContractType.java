package com.getinfo.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ContractType {
    PUBLICO,
    PRIVADO,
    INTERNO;

    @JsonCreator
    public static ContractType fromValue(String value) {
        return ContractType.valueOf(value.toUpperCase());
    }
}

package com.getinfo.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ServiceType {
    CONSULTORIA,
    MANUTENCAO,
    DESENVOLVIMENTO;

    @JsonCreator
    public static ServiceType fromValue(String value) {
        return ServiceType.valueOf(value.toUpperCase());
    }
}

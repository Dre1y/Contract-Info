package com.getinfo.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ServiceOrderType {
    EXECUCAO,
    COMPLEMENTAR,
    EMERGENCIAL;

    @JsonCreator
    public static ServiceOrderType fromValue(String value) {
        return ServiceOrderType.valueOf(value.toUpperCase());
    }
}

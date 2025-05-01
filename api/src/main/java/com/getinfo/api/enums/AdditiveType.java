package com.getinfo.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum AdditiveType {
    PRAZO,
    VALOR,
    OBJETO;

    @JsonCreator
    public static AdditiveType from(String value) {
        return AdditiveType.valueOf(value.toUpperCase());
    }
}

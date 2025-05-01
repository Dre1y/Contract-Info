package com.getinfo.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Status {
    PENDENTE,
    APROVADO,
    REJEITADO,
    CONCLUIDO,
    CANCELADO;

    @JsonCreator
    public static Status from(String value) {
        return Status.valueOf(value.toUpperCase());
    }
}
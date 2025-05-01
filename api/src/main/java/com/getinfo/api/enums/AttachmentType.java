package com.getinfo.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum AttachmentType {
    CONTRATO,
    ENTREGAVEL,
    ORDEM_DE_SERVICO,
    ADITIVO,
    RENEGOCIACAO;

    @JsonCreator
    public static AttachmentType from(String value) {
        return AttachmentType.valueOf(value.toUpperCase());
    }
}

ALTER TABLE attachment
    ADD COLUMN contract_id BINARY(16);

ALTER TABLE attachment
    ADD CONSTRAINT fk_attachment_contract
        FOREIGN KEY (contract_id)
            REFERENCES contract(id);
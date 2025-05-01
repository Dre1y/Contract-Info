ALTER TABLE deliverable
    ADD COLUMN contract_id BINARY(16);

ALTER TABLE deliverable
    ADD CONSTRAINT fk_deliverable_contract
        FOREIGN KEY (contract_id)
            REFERENCES contract(id);
ALTER TABLE service_order
    ADD COLUMN contract_id BINARY(16);

ALTER TABLE service_order
    ADD CONSTRAINT fk_service_order_contract
        FOREIGN KEY (contract_id)
            REFERENCES contract(id);
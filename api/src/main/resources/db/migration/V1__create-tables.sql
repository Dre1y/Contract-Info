-- 1. attachment
CREATE TABLE attachment (
                            id BINARY(16) PRIMARY KEY,
                            attachment_type VARCHAR(50),
                            attached_url VARCHAR(255),
                            deliverables_url VARCHAR(255)
);

-- 2. contractor
CREATE TABLE contractor (
                            id BINARY(16) PRIMARY KEY,
                            name VARCHAR(255),
                            cpf_cnpj VARCHAR(18),
                            phone VARCHAR(20),
                            cep VARCHAR(10)
);

-- 3. person
CREATE TABLE person (
                        id BINARY(16) PRIMARY KEY,
                        name VARCHAR(100),
                        cpf_cnpj VARCHAR(20),
                        rg VARCHAR(20),
                        email VARCHAR(100),
                        phone VARCHAR(20),
                        address VARCHAR(255)
);

-- 4. additive ( sem FK para contract, contract ainda não existe)
CREATE TABLE additive (
                          id BINARY(16) PRIMARY KEY,
                          additive_type VARCHAR(50),
                          adjusted_value DECIMAL(10,2),
                          extended_deadline DATE,
                          details TEXT,
                          status VARCHAR(50),
                          change_reason TEXT,
                          approved_by VARCHAR(100),
                          attachment_id BINARY(16),
                          CONSTRAINT fk_additive_attachment FOREIGN KEY (attachment_id) REFERENCES attachment(id)
);

-- 5. service_order
CREATE TABLE service_order (
                               id BINARY(16) PRIMARY KEY,
                               service_order_number VARCHAR(50),
                               service_order_description VARCHAR(255),
                               service_order_type VARCHAR(50),
                               status VARCHAR(50),
                               start_date DATE,
                               resource VARCHAR(50),
                               resource_description VARCHAR(255),
                               attachment_id BINARY(16),
                               CONSTRAINT fk_service_order_attachment FOREIGN KEY (attachment_id) REFERENCES attachment(id)
);

-- 6. deliverable
CREATE TABLE deliverable (
                             id BINARY(16) PRIMARY KEY,
                             description VARCHAR(255),
                             due_date DATE,
                             status VARCHAR(50),
                             attachment_id BINARY(16),
                             CONSTRAINT fk_deliverable_attachment FOREIGN KEY (attachment_id) REFERENCES attachment(id)
);

-- 7. contract
CREATE TABLE contract (
                          id BINARY(16) PRIMARY KEY,
                          contract_type VARCHAR(50),
                          service_type VARCHAR(100),
                          description VARCHAR(255),
                          validity_start DATE,
                          validity_end DATE,
                          completion_date DATE,
                          payment_due_date DATE,
                          contractor_id BINARY(16),
                          additive_id BINARY(16),
                          deliverable_id BINARY(16),
                          service_order_id BINARY(16),
                          attachment_id BINARY(16),
                          CONSTRAINT fk_contract_contractor FOREIGN KEY (contractor_id) REFERENCES contractor(id),
                          CONSTRAINT fk_contract_additive FOREIGN KEY (additive_id) REFERENCES additive(id),
                          CONSTRAINT fk_contract_deliverable FOREIGN KEY (deliverable_id) REFERENCES deliverable(id),
                          CONSTRAINT fk_contract_service_order FOREIGN KEY (service_order_id) REFERENCES service_order(id),
                          CONSTRAINT fk_contract_attachment FOREIGN KEY (attachment_id) REFERENCES attachment(id)
);

-- 8. adicionar a FK que faltava em additive -> contract
ALTER TABLE additive
    ADD COLUMN contract_id BINARY(16),
ADD CONSTRAINT fk_additive_contract FOREIGN KEY (contract_id) REFERENCES contract(id);

-- 9. contract_amendment
CREATE TABLE contract_amendment (
                                    id BINARY(16) PRIMARY KEY,
                                    amendment_type VARCHAR(50),
                                    amendment_date DATE,
                                    details TEXT,
                                    approved_by VARCHAR(100),
                                    contract_id BINARY(16),
                                    attachment_id BINARY(16),
                                    CONSTRAINT fk_amendment_contract FOREIGN KEY (contract_id) REFERENCES contract(id),
                                    CONSTRAINT fk_amendment_attachment FOREIGN KEY (attachment_id) REFERENCES attachment(id)
);

-- 10. renegotiation
CREATE TABLE renegotiation (
                               id BINARY(16) PRIMARY KEY,
                               renegotiation_type VARCHAR(50),
                               renegotiation_date DATE,
                               details TEXT,
                               change_reason TEXT,
                               responsible_parties VARCHAR(255),
                               status VARCHAR(50),
                               approved_by VARCHAR(100),
                               contract_id BINARY(16),
                               attachment_id BINARY(16),
                               CONSTRAINT fk_renegotiation_contract FOREIGN KEY (contract_id) REFERENCES contract(id),
                               CONSTRAINT fk_renegotiation_attachment FOREIGN KEY (attachment_id) REFERENCES attachment(id)
);

-- 11. contract_position
CREATE TABLE contract_position (
                                   id BINARY(16) PRIMARY KEY,
                                   position VARCHAR(50),
                                   position_description VARCHAR(255),
                                   quantity INT,
                                   contract_id BINARY(16),
                                   person_id BINARY(16),
                                   CONSTRAINT fk_position_contract FOREIGN KEY (contract_id) REFERENCES contract(id),
                                   CONSTRAINT fk_position_person FOREIGN KEY (person_id) REFERENCES person(id)
);
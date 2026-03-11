package com.cineplanet.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private final JdbcTemplate jdbcTemplate;

    public DataInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) {
        createProcedures();
    }

    private void createProcedures() {
        try {
            jdbcTemplate.execute("DROP PROCEDURE IF EXISTS sp_web_get_premieres");
            jdbcTemplate.execute(
                    "CREATE PROCEDURE sp_web_get_premieres() " +
                            "BEGIN " +
                            "SELECT * FROM premieres; " +
                            "END"
            );
            log.info("SP sp_web_get_premieres creado");

            jdbcTemplate.execute("DROP PROCEDURE IF EXISTS sp_web_get_candy_items");
            jdbcTemplate.execute(
                    "CREATE PROCEDURE sp_web_get_candy_items() " +
                            "BEGIN " +
                            "SELECT * FROM candy_items; " +
                            "END"
            );
            log.info("SP sp_web_get_candy_items creado");

            jdbcTemplate.execute("DROP PROCEDURE IF EXISTS sp_web_save_transaction");
            jdbcTemplate.execute(
                    "CREATE PROCEDURE sp_web_save_transaction(" +
                            "IN p_email VARCHAR(255), " +
                            "IN p_names VARCHAR(255), " +
                            "IN p_dni VARCHAR(255), " +
                            "IN p_operationDate VARCHAR(255), " +
                            "IN p_transactionId VARCHAR(255)) " +
                            "BEGIN " +
                            "INSERT INTO transactions (email, names, dni, operationDate, transactionId) " +
                            "VALUES (p_email, p_names, p_dni, p_operationDate, p_transactionId); " +
                            "END"
            );
            log.info("SP sp_web_save_transaction creado");

        } catch (Exception e) {
            log.error("Error creando SPs: {}", e.getMessage());
        }
    }
}
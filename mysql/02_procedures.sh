#!/bin/bash
mysql -u root -p"$MYSQL_ROOT_PASSWORD" cinemaxrisdb -e "CREATE PROCEDURE sp_web_get_premieres() BEGIN SELECT * FROM premieres; END"

mysql -u root -p"$MYSQL_ROOT_PASSWORD" cinemaxrisdb -e "CREATE PROCEDURE sp_web_get_candy_items() BEGIN SELECT * FROM candy_items; END"

mysql -u root -p"$MYSQL_ROOT_PASSWORD" cinemaxrisdb -e "CREATE PROCEDURE sp_web_save_transaction(IN p_email VARCHAR(255), IN p_names VARCHAR(255), IN p_dni VARCHAR(255), IN p_operationDate VARCHAR(255), IN p_transactionId VARCHAR(255)) BEGIN INSERT INTO transactions (email, names, dni, operationDate, transactionId) VALUES (p_email, p_names, p_dni, p_operationDate, p_transactionId); END"
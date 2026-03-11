SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS cinemaxrisdb;
USE cinemaxrisdb;

CREATE TABLE IF NOT EXISTS premieres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    imageUrl VARCHAR(255),
    genre VARCHAR(255),
    duration VARCHAR(255),
    rating VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS candy_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price FLOAT
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    names VARCHAR(255),
    dni VARCHAR(255),
    operationDate VARCHAR(255),
    transactionId VARCHAR(255)
);

INSERT INTO premieres (title, description, imageUrl, genre, duration, rating) VALUES
('Michael (2026)', 'El viaje de Michael Jackson más allá de la música.', 'https://image.tmdb.org/t/p/w600_and_h900_face/mB3zisIw3bsQcoDSnvMPAQhjrTM.jpg', 'Música • Drama', '2h 10min', 'PG-13'),
('Mortal Kombat II', 'Los campeones favoritos se enfrentan a muerte.', 'https://image.tmdb.org/t/p/w600_and_h900_face/dxUg4OCHJJdQURZdLiMcTv7OZfn.jpg', 'Acción • Fantasía', '1h 56min', 'R'),
('Star Wars: The Mandalorian', 'Un cazarrecompensas protege a un bebé alienígena.', 'https://image.tmdb.org/t/p/w600_and_h900_face/aY7a38Ef0lNn0ohMpaG4ODUuPIG.jpg', 'Acción • Aventura', '2h 0min', 'R'),
('Supergirl', 'Kara Zor-El en un épico viaje interestelar.', 'https://image.tmdb.org/t/p/w600_and_h900_face/j1FSus4RoDJpY8zzfwjaqBktlUk.jpg', 'Acción • Aventura', '2h 0min', 'R');

INSERT INTO candy_items (name, description, price) VALUES
('COMBO 2 + 2 KIT KAT', '1 Canchita Gigante + 2 Bebidas + 2 Kit Kat', 54.00),
('COMBO 1 + KIT KAT', '1 Canchita Grande + 1 Bebida + 1 Kit Kat', 30.50),
('COMBO 1 + B.MOOD 40', '1 Canchita Grande + 1 Bebida + 1 Biscolata Mood', 28.50),
('COMBO 2 + 2 DUOMAX', '1 Canchita Gigante + 2 Bebidas + 2 Duomax', 51.00),
('Combo 1', '1 Canchita Grande + 1 Bebida', 24.50),
('COMBO HOT DOG', '1 Hot Dog + papas + 1 Bebida', 19.00),
('COMBO HD + C. AMERICANO', '1 Hot Dog + 1 Café Americano', 17.50);
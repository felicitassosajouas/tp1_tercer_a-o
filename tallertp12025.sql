drop database if exists tp1_tercer_año;
CREATE DATABASE tp1_tercer_año;
USE tp1_tercer_año;

CREATE TABLE clients (
    id_client INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    address VARCHAR(100) NOT NULL
);

CREATE TABLE vehicles (
    id_vehicle INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    patente VARCHAR(10) NOT NULL,
    year_vehicles YEAR NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    id_client INT NOT NULL,
    FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE
);

CREATE TABLE repairs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_vehicle INT NOT NULL,
    id_client INT NOT NULL,
    date_repair DATE NOT NULL,
    description_repair VARCHAR(200) NOT NULL,
    work_done VARCHAR(100) NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_vehicle) REFERENCES vehicles(id_vehicle) ON DELETE CASCADE,
    FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE
);
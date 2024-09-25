CREATE DATABASE login_system; 

USE login_system;

CREATE TABLE users(
    user_id INT PRIMARY_KEY AUTO INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_username VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL,
)
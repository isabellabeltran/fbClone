DROP DATABASE IF EXISTS greenfield;
CREATE DATABASE greenfield;

USE greenfield;

CREATE TABLE users (
  `id` INT AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `profile_picture` VARCHAR(255) NOT NULL,
  `treats` VARCHAR(255) ,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,  
  `status` VARCHAR (255),
  PRIMARY KEY (`id`),
  INDEX `username_idx` (`username`)
);

CREATE TABLE posts (
  `id` INT AUTO_INCREMENT,
  `post_text` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `id_author` INT,
  `id_wall` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE comments (
  `id` INT AUTO_INCREMENT,
  `text_comment` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `id_post` INT,
  `id_author` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE user_friends (
  `id` INT AUTO_INCREMENT,
  `id_one` INT,
  `id_two` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE status (
  `id` INT AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
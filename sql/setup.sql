-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released INT
);

INSERT INTO books (
    title,
    released
)
VALUES 
('Dreadgod', 2022),
('The Hunger of the Gods', 2022),
('The Pariah', 2021),
('Bastion', 2021),
('Assassin''s Apprentice', 1996)
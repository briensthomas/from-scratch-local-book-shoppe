-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

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
('Assassin''s Apprentice', 1996);


CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    dob VARCHAR,
    pob VARCHAR
);
INSERT INTO authors (
    name,
    dob,
    pob
)
VALUES
('Will Wight', '08/11/1989', 'Memphis, TN'),
('John Gwynne', '09/21/1968', 'Singapore'),
('Anthony Ryan', '1970', 'Scotland'),
('Phil Tucker', 'Unknown', 'Brazil'),
('Robin Hobb', '03/05/1952', 'Berkeley, CA');

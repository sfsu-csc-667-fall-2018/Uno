/*DROP TABLE IF EXISTS Games allcards;
CREATE TABLE IF NOT EXISTS allcards
(
    id SERIAL PRIMARY KEY,
    number INTEGER,
    color VARCHAR (255),
    value INTEGER,
    image VARCHAR (255)
);

DROP TABLE IF EXISTS Games discarddeck;
CREATE TABLE IF NOT EXISTS discarddeck
(
    id SERIAL PRIMARY KEY,
    gameid INTEGER,
    cardid INTEGER
);

CREATE TABLE IF NOT EXISTS discarddeck
(
    id SERIAL PRIMARY KEY,
    gameid INTEGER,
    cardid INTEGER
);

CREATE TABLE IF NOT EXISTS drawdeck
(
    id SERIAL PRIMARY KEY,
    gameid INTEGER,
    cardid INTEGER,
    index INTEGER
);

CREATE TABLE IF NOT EXISTS games
(
    id SERIAL PRIMARY KEY,
    name VARCHAR (255)
);/*
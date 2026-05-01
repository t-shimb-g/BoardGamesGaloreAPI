-- create the table for games
CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    desc TEXT NOT NULL,
    rules TEXT NOT NULL,
    img TEXT NOT NULL,
    route TEXT NOT NULL,
    enabled INTEGER CHECK (enabled IN (0, 1)) NOT NULL
);

-- create favorite games table
CREATE TABLE favorite_games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(id)
);
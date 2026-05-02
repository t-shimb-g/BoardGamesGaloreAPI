const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'boardgames.db');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// create the db if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        desc TEXT NOT NULL,
        rules TEXT NOT NULL,
        img TEXT NOT NULL,
        route TEXT NOT NULL,
        enabled INTEGER CHECK (enabled IN (0, 1)) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS favorite_games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER NOT NULL,
        UNIQUE (game_id),
        FOREIGN KEY (game_id) REFERENCES games(id)
    );
`);

module.exports = db;
const express = require('express');
const router = express.Router();
const db = require('../db/database');

function getFavGameIDs() {
    return db.prepare(`
        SELECT game_id
        FROM favorite_games
        ORDER BY game_id
    `).get()
}

// Get ALL favorite games
router.get('/', (req, res) => {
    try {
        const favGames = db.prepare(`
            SELECT *
            FROM games
            WHERE id IN (
                SELECT game_id
                FROM favorite_games
            )
        `).all()

        res.json(favGames);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch favorite games'});
    }
});

// Update favorite games with given ID
router.post('/:id', (req, res) => {
    const gameID = req.params.id;

    try {
        console.log(`Attempting to insert ${gameID}`);
        db.prepare(`
            INSERT INTO favorite_games (game_id) VALUES (?)
        `).run(gameID);

        res.json({msg: 'Successfully inserted game'});
    } catch (error) {
        res.status(500).json({error: 'Failed to update favorite games'});
    }
});

module.exports = router;
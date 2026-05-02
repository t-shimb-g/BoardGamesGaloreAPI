const express = require('express');
const router = express.Router();
const db = require('../db/database');

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
        const existing = db.prepare(`
            SELECT * FROM favorite_games WHERE game_id = ?
        `).get(gameID);

        if (existing) {
            db.prepare(`
                DELETE FROM favorite_games WHERE game_id = ?
            `).run(gameID);

            return res.json({ msg: 'Removed from favorites' });
        }
        else {
            db.prepare(`
                INSERT INTO favorite_games (game_id) VALUES (?)
            `).run(gameID);
        }

        res.json({msg: 'Added to favorites'});
    } catch (error) {
        res.status(500).json({error: 'Failed to update favorite games'});
    }
});

module.exports = router;
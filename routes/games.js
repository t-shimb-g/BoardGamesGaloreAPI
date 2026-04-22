const express = require('express');
const router = express.Router();
const db = require('../db/database');

function getGameByRoute(route) {
    return db.prepare(`
        SELECT route, enabled
        FROM games
        WHERE route = ?
    `).get(route)
}

// GET all games
router.get('/', (req, res) => {
    try {
        const games = db.prepare(`
            SELECT id, name, desc, rules, img, route, enabled
            FROM games
            ORDER BY name
        `).all();

        res.json(games);
    } catch(error) {
        res.status(500).json({error: 'Failed to fetch games'});
    }
});

// GET one game by route
router.get('/:route', (req, res) => {
    const route = req.params.route;

    try {
        const game = getGameByRoute(route);
        console.log(game);

        if (!game) {
            return res.status(404).json({error: `Game not found: ${route}`});
        }
        if (Number(game.enabled) === 0) {
            return res.status(300).json({error: 'Game not enabled. How did you end up here?'})
        }
        res.json(game);
    } catch(error) {
        res.status(500).json({error: `Failed to fetch game: ${route}`});
    }
});

module.exports = router;
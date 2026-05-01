const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// fix cors
const cors = require('cors');
app.use(cors());

// initialize database
require('./db/database');

// routes
const gamesRouter = require("./routes/games");
app.use('/games', gamesRouter);

// basic health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => {
    console.log("API is running");
    console.log(`Test the health check at http://localhost:${PORT}/health`);
});

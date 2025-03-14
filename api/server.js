const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Serve questions from specified JSON file based on query parameter
app.get('/api/questions', (req, res) => {
    const fileName = req.query.file; // Get the file name from the query parameter
    const filePath = path.join(__dirname, `${fileName}.json`); // Path to the JSON file

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error", details: err.message });
            return;
        }
        try {
            const questions = JSON.parse(data);
            res.json(questions);
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            res.status(500).json({ error: "Error parsing JSON", details: parseErr.message });
        }
    });
});

module.exports = app;
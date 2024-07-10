// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require("path")

// Const Variables
const PORT = process.env.PORT || 1337;
const FLAG = process.env.FLAG || 'bi0s{magn3t0n_15_5t33l}';
// The Pokémaster
let score;

// Creating an express app
const app = express();

// Setting the static directory
app.use(express.static(__dirname + '/public'));

// Using template engine
app.set('view engine', 'ejs');

// Using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, "robots.txt"));
});

app.get('/s3cr3t', (req, res) => {
    res.render('secret', {
        flag: score > 100 ? FLAG : "There are more magnetons (Not enough score!), Defeat more magnetons! or maybe not!"
    });
});

app.post('/score', (req, res) => {
    try {
        let current = parseInt(req.body.score);
        score = current;

        res.send({ data: `Score set as ${current}`});
    } catch (error) {
        res.status(500).send({ error: "Only INT" });
    }
});

app.get('*', (req, res) => {
    res.render('404');
});

// Listening on Port ${PORT}
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

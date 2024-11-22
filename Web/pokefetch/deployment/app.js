// Dependencies
const express           = require('express');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const MYSQL             = require('mysql2');
const { v4: uuidv4 }    = require('uuid');

// Const Variables
const PORT = process.env.PORT || 1337;
const FLAG = "http://inctfj{http://1_70v3_3v07u710n5.com}";
const randomUUIDs = Array.from({ length: 10 }, () => uuidv4());

// Creating an express app
const app = express();
app.disable('x-powered-by');

// Setting the static directory
app.use(express.static(__dirname + '/public'));

// Using template engine
app.set('view engine', 'ejs');

// Using bodyParser, cookieParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Creating con object for MYSQL
const con = MYSQL.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'pokefetch'
});

// Creating tables if not exists
let query = `CREATE TABLE IF NOT EXISTS pokefetch (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255),
        PRIMARY KEY (id)
    );`

con.query(query, (err, result) => {
    if (err) console.log(err);
});

// Adding random
randomUUIDs.forEach((uuid) => {
    const insertQuery = `INSERT INTO pokefetch (name, url) VALUES (?, 'http://${uuid + "@fake.com"}')`;
    con.query(insertQuery, ["Im-a-Random-poke-" + uuid], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
        }
    });
});

// Adding the special pokemon
const sqlQuery = `INSERT INTO pokefetch (name, url) VALUES (?, ?)`;
con.query(sqlQuery, ['pokeflag', FLAG], (err, result) => {
    if (err) {
        console.error('Error inserting user:', err);
    }
});

// Functions
async function sanitize(input) {
    const pattern = /\-|\||\&|"/gmi;

    return input.replaceAll(pattern, '');
}

async function pokefetch(pokemon) {
    const { default: fetch } = await import('node-fetch');
    const sanitizedPokemon = await sanitize(pokemon);
    const query = `SELECT * FROM pokefetch WHERE name = '${sanitizedPokemon}'`;
    let fetchUrl = `https://pokeapi.co/api/v2/pokemon/${sanitizedPokemon}`;

    try {
        const [results] = await con.promise().query(query);

        if (results.length === 0) {
            const insertQuery = `INSERT INTO pokefetch (name, url) VALUES (?, ?)`;
            await con.promise().query(insertQuery, [sanitizedPokemon, fetchUrl]);
        }

        const url = results.length > 0 ? results[0].url : fetchUrl;

        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            return [json, false];
        } else {
            return [{error: "Unknown Pokemon"}, true];
        }

    } catch (error) {
        console.error('Error:', error);
        return [{ error: error.message }, true];
    }
}

async function handlePokemon(pokemon) {
    const [ response, error ] = await pokefetch(pokemon);
    console.log(response, error);
    
    if (error) return response;
    const pokemonResponse = {
        name: response.species.name,
        ability: response.abilities.map(obj => obj.ability.name),
        weight: response.weight,
        height: response.height,
    };

    return pokemonResponse;
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api', async (req, res) => {
    const pokemon = req.body.pokemon;

    const response = await handlePokemon(pokemon);
    try {
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: "Error Occured!" });
    }
});

app.get('*', (req, res) => {
    res.render('404');
});

// Listening on Port ${PORT}
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

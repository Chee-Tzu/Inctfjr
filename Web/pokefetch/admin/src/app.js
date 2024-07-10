// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Const Variables
const PORT = process.env.PORT || 1337;
const FLAG = process.env.FLAG || 'bi0s{p0k3f3tch_Us3s_F3tch}';

// Creating an express app
const app = express();
app.disable('x-powered-by');

// Setting the static directory
app.use(express.static(__dirname + '/public'));

// Using template engine
app.set('view engine', 'ejs');

// Using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Functions
async function pokeFetch(pokemon) {
    const fetch = await import('node-fetch');
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const response = await fetch.default(url);
    let json;
    try {
        json = await response.json();
    } catch (error) {
        json = ({error: "Pokémon not found!"});
        return [json, true];
    }

    return [json, false];
}

async function handlePokemon(pokemon) {
    const [ response, error ] = await pokeFetch(pokemon);
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
        if (response.name.toLowerCase() === "celebi") {
            res.header('X-Flag', FLAG);
        }
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

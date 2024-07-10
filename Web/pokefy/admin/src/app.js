// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const { error } = require('console');

// Const Variables
const PORT = process.env.PORT || 1337;

// Creating an express app
const app = express();
app.disable('x-powered-by');

// Setting the static directory
app.use(express.static(__dirname + '/public'));

// Using template engine
app.set('view engine', 'ejs');

// Using cookieParser, bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// The G.O.A.T
let pokefied = {};

// Functions
async function pokefy(url, name) {
    try {
        const pathValue = path.join('assets', `${name}.png`);
        pokefied[name] = pathValue;
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            headers: {
                'X-Api-Key': 'b80e190f-4e92-47fa-9bb7-52b2479d766a',
            },
        });

        const writeStream = fs.createWriteStream(path.join(__dirname, 'public', pathValue));
        
        const writePromise = new Promise((resolve, reject) => {
            writeStream.on('error', (err) => {
                console.error('Error writing file:', err);
                reject("Error writing file.");
            });

            response.data.pipe(writeStream);

            response.data.on('end', () => {
                resolve("Saved!");
            });

            response.data.on('error', (err) => {
                reject("Error fetching data.");
            });
        });

        await writePromise;

        return "Saved!";
    } catch (error) {
        console.error('Error fetching data:', error);
        return "Error fetching data.";
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pokefy', (req, res) => {
    res.render('pokefy', {
        count: Object.keys(pokefied).length,
    });
});

app.post('/pokefy', async (req, res) => {
    const url = atob(req.cookies.url);
    const resName = atob(req.cookies.name).replace(/'|\s/g, '');

    if (Object.keys(pokefied).length >= 10) {
        res.send({ data: "Error! Maximum collection reached." });
        return;
    }
    const regex = /\.\.\//g;
    const name = resName.replace(regex, '');

    // Give Hint!
    if (!name.match(regex) && resName.match(regex)) {
        const errorMessage = "An unexpected error occurred: const name = resName.replace(/\\.\\.\\//g, '');";
        console.log(errorMessage);
        res.send({
            error: errorMessage,
        });
        return;
    }    

    if (url.trim() !== '' && name.trim() !== '') {
        if (pokefied[name]) {
            res.send({ data: "Error! Pokémon already collected." });
            return;
        }

        const response = await pokefy(url, name);
        console.log("Pokéfy:", pokefied);
        res.send({ data: response });
    } else {
        res.send({ data: "Error! Invalid URL or name." });
    }
});

app.get('/view', async (req, res) => {
    try {
        let imageObjects = [];

        for (const key in pokefied) {
            if (pokefied.hasOwnProperty(key)) {
                const imagePath = path.join(__dirname, 'public', pokefied[key]);
                const imageData = fs.readFileSync(imagePath);

                const base64Image = Buffer.from(imageData).toString('base64');

                const imageObject = {
                    name: key,
                    base64Data: `data:image/jpeg;base64,${base64Image}`
                };

                imageObjects.push(imageObject);
            }
        }

        res.render('view', {
            imageObjects: imageObjects,
            pokefied: pokefied,
        });
    } catch (error) {
        console.log(error);
        res.render('error', {
            error: "500 Internal Server Error"
        });
    }
});



app.post('/download', async (req, res) => {
    const name = req.body.name;
    console.log(name);
    console.log(pokefied[name]);
    if (pokefied[name]) {
        const filePath = path.join(__dirname, 'public', pokefied[name]);
        console.log(filePath);
        res.download(filePath);
    } else {
        res.render('error', {
            error: "404, Not Found",
        });
    }
});

app.get('*', (req, res) => {
    res.render('error', {
        error: "404, Not Found",
    });
});

// Listening on Port ${PORT}
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

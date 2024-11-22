// Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Const Variables
const PORT = process.env.PORT || 1337;

// Creating an express app
const app = express();
app.use(express.json());
app.disable('x-powered-by');

// Setting the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Using template engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "very-very-secure-secret-1234567890-!@#$%^&*())_+",
    resave: false,
    saveUninitialized: true,
}));

// Session Initialization Middleware
app.use((req, res, next) => {
    if (!req.session.collected) {
        req.session.collected = {};
    }
    next();
});

// Functions
async function pokefy(url, name, session) {
    try {
        const filePath = path.resolve(__dirname, 'public', 'assets', `${name}.png`);
        session.collected[name] = `/assets/${name}.png`;

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            headers: { 'X-Api-Key': 'b80e190f-4e92-47fa-9bb7-52b2479d766a' },
        });

        const writeStream = fs.createWriteStream(filePath);

        await new Promise((resolve, reject) => {
            response.data.pipe(writeStream);
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        return "Saved!";
    } catch (error) {
        console.error('Error fetching data:', error);
        delete session.collected[name]; // Rollback in case of failure
        return "Error fetching data.";
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pokefy', (req, res) => {
    res.render('pokefy', {
        count: Object.keys(req.session.collected).length,
    });
});

app.post('/pokefy', async (req, res) => {
    const { name, url } = req.body;
    console.log(req.body);
    
    if (Object.keys(req.session.collected).length >= 10) {
        res.status(400).send({ error: "Error! Maximum collection reached." });
        return;
    }

    const sanitizedName = name?.trim().replace(/'|\s/g, '');
    if (!url?.trim()) {
        res.status(400).send({ error: "Error! Invalid URL or name." });
        return;
    }

    if (req.session.collected[sanitizedName]) {
        res.status(400).send({ error: "Error! Pokémon already collected." });
        return;
    }

    const result = await pokefy(url, sanitizedName, req.session);
    res.send({ data: result });
});

app.get('/view', async (req, res) => {
    try {
        const imageObjects = Object.entries(req.session.collected).map(([name, filePath]) => {
            
            const absolutePath = path.join(__dirname, 'public', filePath);
            console.log("path", absolutePath);
            
            const base64Image = fs.existsSync(absolutePath)
                ? fs.readFileSync(absolutePath).toString('base64')
                : null;
            
            return base64Image
                ? { name, base64Data: `data:image/png;base64,${base64Image}` }
                : null;
        }).filter(Boolean);
        
        res.render('view', { imageObjects });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: "500 Internal Server Error" });
    }
});

app.post('/download', async (req, res) => {
    const name = req.body.name;
    console.log(name);
    console.log(req.session.collected[name]);
    try {
        if (name) {
            const filePath = path.join(__dirname, 'public', name);
            console.log(filePath);
            return res.download(filePath);
        } else {
            return res.render('error', {
                error: "404, Not Found",
            });
        }
    } catch (error) {
        return res.render('error', {
            error: "404, Not Found",
        });
    }
});

app.get('*', (req, res) => {
    res.status(404).render('error', { error: "404, Not Found" });
});

// Listening on Port ${PORT}
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

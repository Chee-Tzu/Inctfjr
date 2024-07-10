const fs = require('fs');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); 

const app = express();
const PORT = process.env.PORT || 1410;

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cookieParser()); 

app.get('/', (req, res) => {
    res.cookie('Name', 'James'); 
    res.sendFile(path.join(__dirname, 'index.html')); 
});

app.get('/flageee', (req, res) => {
    const flagPath = path.join(__dirname, 'flag.txt');
    fs.readFile(flagPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading flag file');
        } else {
            res.send(data);
        }
    });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

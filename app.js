const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');

const html = "./dist/angular-tour-of-heroes";

const port = 4000;
const apiUrl = '/api';

const heroes = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

// Express

var app = express();

app
    .use(compression())
    .use(bodyParser.json())
    // Static content
    .use(express.static(html))
    .get('/api/heroes/:id', function (req, res) {
        let id = +req.params.id;
        let hero = heroes.filter(h=>h.id === id);
        res.end(JSON.stringify(hero));
    })
    .delete('/api/heroes/:hero', function (req, res) 
    {
        let heroToDelete = +req.params.hero;
        heroes = heroes.filter(h=> h !== heroToDelete);
        res.end(JSON.stringify(hero));
    })
    .put('/api/heroes/:hero', function (req, res) 
    {
        let heroToUpdate = +req.params.hero;
        for (let index = 0; index < heroes.length; index++) {
            const hero = heroes[index];
            if (hero.id === heroToUpdate.id)
                heroes[index] = heroToUpdate;
        }
        res.end(JSON.stringify(heroToUpdate));
    })
    .get('/api/heroes', function (req, res) {
        res.end(JSON.stringify(heroes));
    })
    
    // Default route
    .get('/', function (req, res) {
        res.sendFile('index.html', { root: html });
    });
    // Start server


app.listen(port, function () {
    console.log('Port: ' + port);
    console.log('Html: ' + html);
});
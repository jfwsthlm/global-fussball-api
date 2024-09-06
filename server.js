const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const season = require('./controllers/season');
const knex = require('knex');
const db = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3308,
      user: 'iipax',
      password: 'iipax123',
      database: 'liga_nord',
    },
  });

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Success');
})

/*app.get('/schedule/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json((user[0]));
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'));
    res.json()
})*/

app.get('/season/:name/:year', (req, res) => { season.handleGetSeason(req, res, db) })

app.get('/bootstrap', (req, res) => { season.handleBootstrap(req, res, db) })

app.put('/update', (req, res) => { season.handleUpdate(req, res, db) })

app.listen(4000, () => {
    console.log('app is running on port 4000');
})
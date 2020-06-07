const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_BREWERIES = 'SELECT * FROM test_breweries';
const SELECT_ALL_BEERS = 'SELECT * FROM test_beers';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty123',
    database: 'craft_beers'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send("go to /breweries to see all")
});

app.get('/beers', (req, res) => {
    connection.query(SELECT_ALL_BEERS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get('/breweries/add', (req, res) => {
    const {name, city, state} = req.query;
    const INSERT_BREWERIES_QUERY = `INSERT INTO test_breweries(name, city, state) VALUES('${name}', '${city}', '${state}')`;
    connection.query(INSERT_BREWERIES_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else{
            return res.send("ran sucessfully");
        } 
    });
    
})

app.get('/breweries', (req, res) => {
    connection.query(SELECT_ALL_BREWERIES, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.listen(4000, () => {
    console.log("BREWERIES is listening on port 4000");
})
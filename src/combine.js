const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_BREWERIES = 'SELECT * FROM beer limit 5';
const SELECT_ALL_BEERS = 'SELECT * FROM review limit 5';



const TOP_TEN = `SELECT brewery.brewery_name, avg(review.review_overall) as avg_review
                FROM brewery, review, beer
                WHERE brewery.brewery_id = beer.brewery_id AND beer.beer_id = review.beer_id
                GROUP BY brewery.brewery_name
                HAVING COUNT(*) > 100
                ORDER BY avg_review DESC
                LIMIT 10`;

const RAND_GEN = `SELECT beer_name, beer_abv, beer_style 
                  FROM beer 
                  ORDER BY RAND() 
                  LIMIT 1`;

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hello',
    database: 'finalP'
});



connection.getConnection(function(err, connection){
    if(err) {
    	console.log("unable to connect")
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send("You are at root directory of server")
});

app.get('/top_ten', (req, res) => {
    connection.query(TOP_TEN, (err, results) => {
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

app.get('/gen_rand', (req, res) => {
    connection.query(RAND_GEN, (err, results) => {
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

app.get('/add_review', (req, res) => {
    console.log("sadkjf")
    const {review_beer_id, review_overall, review_aroma, review_taste, review_palate, review_appearance, review_profilename} = req.query;
    // var beer_id = req.body.add_overall;
    console.log(review_beer_id);
    const INSERT_BREWERIES_QUERY = `INSERT INTO review2 (beer_id, review_overall, review_time, review_aroma, review_taste, review_palate, review_appearance, review_profilename) 
    VALUES (‘${review_beer_id}’, ‘${add_overall}’, UNIX_TIMESTAMP(), ‘${add_aroma}’, ‘${add_taste}’, ‘${add_palate}’, ‘${add_appearance}’, ‘${review_profilename}’);
    `;
    connection.query(INSERT_BREWERIES_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else{
            return res.send("ran sucessfully");
        } 
    });
    
})


// app.get('/breweries/add', (req, res) => {
//     const {name, city, state} = req.query;
//     const INSERT_BREWERIES_QUERY = `INSERT INTO test_breweries(name, city, state) VALUES('${name}', '${city}', '${state}')`;
//     connection.query(INSERT_BREWERIES_QUERY, (err, results) => {
//         if (err) {
//             return res.send(err)
//         }
//         else{
//             return res.send("ran sucessfully");
//         } 
//     });
    
// })

app.listen(4000, () => {
    console.log("The server is listening on port 4000");
})


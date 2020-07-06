const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

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

const SEARCH_BY_NAME = `SELECT beer.beer_name, beer.beer_abv, beer.beer_style, review.review_overall, beer.beer_id  
                        FROM beer, review
                        WHERE beer.beer_id = review.review_id AND beer.beer_name 
                        LIKE ?`;

const SEARCH_BY_BREWERY = `SELECT beer.beer_name, beer.beer_abv, beer.beer_style, brewery.brewery_name
                            FROM beer, brewery
                            WHERE beer.brewery_id = brewery.brewery_id AND brewery.brewery_name 
                            LIKE ?`;



const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1311811Be@n",
  database: "craftbeers",
});

connection.getConnection(function (err, connection) {
  if (err) {
    console.log("unable to connect");
    return err;
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("You are at root directory of server");
});

app.get("/top_ten", (req, res) => {
  connection.query(TOP_TEN, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/gen_rand", (req, res) => {
  connection.query(RAND_GEN, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/search/beer_name/:query", (req, res) => {
  let query = req.params.query;
  query = "%" + query + "%";
  console.log(query);
  connection.query(SEARCH_BY_NAME, [query], (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/search/brewery_name/:query", (req, res) => {
  let query = req.params.query;
  query = "%" + query + "%";
  console.log(query);
  connection.query(SEARCH_BY_BREWERY, [query], (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

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
});

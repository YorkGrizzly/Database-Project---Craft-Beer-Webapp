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

const SEARCH_REVIEW_BY_BEER_ID = `SELECT review.beer_id, beer.beer_name, review.review_profilename, 
                                          FROM_UNIXTIME(review.review_time) as review_time, review.review_overall, 
                                          review.review_aroma, review.review_appearance, review.review_palate, 
                                          review.review_taste, review.review_id
                                  FROM review, beer
                                  WHERE review.beer_id = ? AND review.beer_id = beer.beer_id
                                  ORDER BY review.review_overall DESC`;

const RETRIEVE_LATEST_200_REVIEW = `SELECT review.beer_id, beer.beer_name, review.review_profilename, 
                                  FROM_UNIXTIME(review.review_time) as review_time, review.review_overall, 
                                  review.review_aroma, review.review_appearance, review.review_palate, 
                                  review.review_taste, review.review_id
                                FROM review, beer
                                WHERE review.beer_id = beer.beer_id
                                ORDER BY review_time DESC
                                LIMIT 200`;

const SEARCH_REVIEW_BY_USER = `SELECT review.beer_id, beer.beer_name, review.review_profilename, 
                                  review.review_id ,FROM_UNIXTIME(review.review_time) as review_time, 
                                  review.review_overall, review.review_aroma, review.review_appearance, 
                                  review.review_palate, review.review_taste
                                FROM review, beer
                                WHERE beer.beer_id = review.beer_id 
                                AND review.review_profilename LIKE ?
                                ORDER BY review.review_time, review.beer_id DESC`;

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

app.get("/search/beer_id/:query", (req, res) => {
  let query = req.params.query;
  console.log(query);
  connection.query(SEARCH_REVIEW_BY_BEER_ID, [query], (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/review", (req, res) => {
  connection.query(RETRIEVE_LATEST_200_REVIEW, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/search/user_name/:query", (req, res) => {
  let query = req.params.query;
  query = "%" + query + "%";
  console.log(query);
  connection.query(SEARCH_REVIEW_BY_USER, [query], (err, results) => {
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

app.listen(4000, () => {
  console.log("The server is listening on port 4000");
});

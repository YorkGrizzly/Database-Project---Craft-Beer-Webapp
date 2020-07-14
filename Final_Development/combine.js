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
                               ORDER BY review.review_time DESC, review.beer_id`;

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
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

app.get("/rank_beers", (req, res) => {
  const { rank_by, min_ratings } = req.query;
  const RANK_BY = `SELECT beer.beer_id, beer.beer_name, temp.review_${rank_by} as ${rank_by}
  FROM (SELECT review.beer_id, AVG(review.review_${rank_by}) AS review_${rank_by}
        FROM review
        GROUP BY review.beer_id
        HAVING COUNT(*) > ${min_ratings}
        ) AS temp, beer
  WHERE beer.beer_id = temp.beer_id
  ORDER BY temp.review_${rank_by} DESC
  LIMIT 100`;
  connection.query(RANK_BY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/beer_of_year", (req, res) => {
  const { boty_year } = req.query;
  const BEER_OF_THE_YEAR = `SELECT beer.beer_name, beer.beer_abv, beer.beer_style, AVG(review.review_overall) as score 
  FROM beer, review 
  WHERE beer.beer_id = review.beer_id AND FROM_UNIXTIME(review.review_time, "%Y") = ${boty_year}
  GROUP BY beer.beer_id 
  ORDER BY score DESC
  LIMIT 3`;
  connection.query(BEER_OF_THE_YEAR, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/seasonal_choice", (req, res) => {
  const { season } = req.query;
  const SEASONAL_CHOICE = `SELECT beer.beer_name, beer.beer_style, beer.beer_abv
  FROM (SELECT temp.season, temp.beer_id, SUM(temp.review_overall) AS totalOverall
      FROM (SELECT review.beer_id, review.review_overall,
        CASE  
          WHEN FROM_UNIXTIME(review.review_time, "%m")>=1 AND FROM_UNIXTIME(review.review_time, "%m")<=3 THEN "SPRING"
          WHEN FROM_UNIXTIME(review.review_time, "%m")>=4 AND FROM_UNIXTIME(review.review_time, "%m")<=6 THEN "SUMMER"
          WHEN FROM_UNIXTIME(review.review_time, "%m")>=7 AND FROM_UNIXTIME(review.review_time, "%m")<=9 THEN "AUTUMN"
          WHEN FROM_UNIXTIME(review.review_time, "%m")>=10 AND FROM_UNIXTIME(review.review_time, "%m")<=12 THEN "WINTER"
          ELSE "NO_SEASON"
        END AS season
        FROM  review) AS temp
      GROUP BY temp.season, temp.beer_id) AS temp2, beer
  WHERE beer.beer_id = temp2.beer_id AND temp2.season = '${season}'
  GROUP BY temp2.beer_id
  ORDER BY temp2.totalOverall DESC
  LIMIT 1`;
  connection.query(SEASONAL_CHOICE, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/top_hit", (req, res) => {
  const { thoty_year } = req.query;
  const TOP_HIT = `SELECT  beer.beer_name, beer.beer_name, beer.beer_style, beer. beer_abv, temp.reviewCnt as numberOfReview
                   FROM (SELECT review.beer_id, COUNT(review.review_id) as reviewCnt FROM review
                   WHERE FROM_UNIXTIME(review.review_time, "%Y") = ${thoty_year}
                   GROUP BY review.beer_id
                   ) AS temp, beer
                   WHERE temp.beer_id = beer.beer_id
                   ORDER BY temp.reviewCnt DESC
                   LIMIT 1`;
  connection.query(TOP_HIT, (err, results) => {
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

app.get("/add_review", (req, res) => {
  const {
    profilename,
    beer_id,
    add_overall,
    add_aroma,
    add_taste,
    add_palate,
    add_appearance,
  } = req.query;
  // var beer_id = req.body.add_overall;
  const ADD_REVIEW = `INSERT INTO review2 (beer_id, review_overall, review_time, review_aroma, review_taste, review_palate, review_appearance, review_profilename) 
  VALUES (${beer_id}, ${add_overall}, UNIX_TIMESTAMP(), ${add_aroma}, ${add_taste}, ${add_palate}, ${add_appearance}, '${profilename}')`;
  connection.query(ADD_REVIEW, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      console.log("A new review has been submitted!");
      return res.send("ran sucessfully");
    }
  });
});

app.get("/edit_review", (req, res) => {
  const {
    edit_review_id,
    edit_overall,
    edit_aroma,
    edit_taste,
    edit_palate,
    edit_appearance,
  } = req.query;
  // var beer_id = req.body.add_overall;
  const EDIT_REVIEW = `UPDATE review2 
  SET review_overall = ${edit_overall}, review_time = UNIX_TIMESTAMP(), review_aroma = ${edit_aroma}, review_taste = ${edit_taste}, review_palate = ${edit_palate}, review_appearance = ${edit_appearance}  
  WHERE review_id = ${edit_review_id}`;

  connection.query(EDIT_REVIEW, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      console.log("A review has been editted!");
      return res.send("ran sucessfully");
    }
  });
});

app.listen(4000, () => {
  console.log("The server is listening on port 4000");
});

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

app.get('/breweries/add', (req, res) => {
    const {beer_id, review_overall, review_time, review_aroma, review_taste, review_palate, review_appearance, review_profilename} = req.query;
    const INSERT_BREWERIES_QUERY = `INSERT INTO review (beer_id, review_overall, review_time, review_aroma, review_taste, review_palate, review_appearance, review_profilename) 
    VALUES (‘${review_beer_id}’, ‘${add_overall}’, UNIX_TIMESTAMP(‘${review_time}’), ‘${review_aroma}’, ‘${add_taste}’, ‘${add_palate}’, ‘${add_appearance}’, ‘${review_profilename}’);
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
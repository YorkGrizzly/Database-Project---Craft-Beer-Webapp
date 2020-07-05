// const top10Board = document.getElementById('top10-board');

var request = new XMLHttpRequest();
request.open("GET", "http://localhost:4000/top_ten", true);
request.onload = function () {
  var result = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
  	var breweryRank = 0;
  	result.data.forEach(brewery => {
  		breweryRank += 1;
  		var html =
  			'<div>#' +
  			breweryRank +
  			'</div><div><b>Brewery Name</b>: ' +
  			brewery.brewery_name +
  			'</div><div><b>Average Review</b>: ' +
  			brewery.avg_review +
  			'</div><br />';
  		$("#top10-board").append(html);
  	})
  } else {
    alert("It's not working!");
  }
};



document.getElementById("random-gen-btn").onclick = function() {
	var reqst = new XMLHttpRequest();
	reqst.open("GET",  "http://localhost:4000/gen_rand", true);
	console.log("loaded");
	reqst.onload = function() {
		
  	var result = JSON.parse(this.response);
  	if (reqst.status >= 200 && reqst.status < 400) {
  		result.data.forEach(rand_gen => {
  			var html =
  				'<div>' +
  				"Have you tried??" +
  				'</div><div><b>Beer Name</b>: ' +
  				rand_gen.beer_name +
  				'</div><div><b>Alcohol Content</b>: ' +
  				rand_gen.beer_abv +
  				'%</div><br />' +
  				'<div><b>Beer Style</b>: '+
  				rand_gen.beer_style +
  				'</div>';
  		$("#random-gen-btn").append(html);
  	})
  } else {
    alert("It's not working!");
  }
}};

request.send();

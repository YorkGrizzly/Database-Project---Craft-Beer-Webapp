$("#boty-year").change(function () {
  year_param = "?boty_year=" + $("#boty-year").val();
  //   console.log(year_param);
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:4000/beer_of_year" + year_param, true);
  request.onload = function () {
    var result = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      $("#boty-result").html("");
      if (result["data"].length == 0) {
        html =
          "<h3><i>Sorry, There Are Currently No Available Data For This Year...</i></h3>";
        $("#boty-result").append(html);
      } else {
        let rank_position = 0;
        let alcohol_html;
        result.data.forEach((beerOfYear) => {
          rank_position += 1;
          if (beerOfYear.beer_abv === null)
            alcohol_html =
              '</div><div><b>Alcohol Content</b>: <i>"Sorry, There is Currently No Data Available for this Attribute"</i></div>';
          else
            alcohol_html =
              "</div><div><b>Alcohol Content: </b>" +
              beerOfYear.beer_abv +
              "%</div>";
          html =
            "<h3>#" +
            rank_position +
            "</h3>" +
            "<div><b>Beer Name: </b>" +
            beerOfYear.beer_name +
            alcohol_html +
            "<div><b>Beer Style: </b>" +
            beerOfYear.beer_style +
            "</div><div><b>Score (Avg. Overall Rating): </b>" +
            beerOfYear.score +
            "</div>";
          $("#boty-result").append(html);
        });
      }
    } else {
      alert("It's not working!");
    }
  };
  request.send();
});

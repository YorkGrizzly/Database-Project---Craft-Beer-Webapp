$("#thoty-year").change(function () {
  $("#thoty-result").html("<br/><i>Running...</i>");

  year_param = "?thoty_year=" + $("#thoty-year").val();
  //   console.log(year_param);
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:4000/top_hit" + year_param, true);
  request.onload = function () {
    var result = JSON.parse(this.response);
    console.log(result);
    if (request.status >= 200 && request.status < 400) {
      $("#thoty-result").html("");
      if (result["data"].length == 0) {
        html =
          "<h3><i>Sorry, There Are Currently No Available Data For This Year...</i></h3>";
        $("#thoty-result").append(html);
      } else {
        let alcohol_html;
        result.data.forEach((topHitOfYear) => {
          if (topHitOfYear.beer_abv === null)
            alcohol_html =
              '</div><div><b>Alcohol Content</b>: <i>"Sorry, There is Currently No Data Available for this Attribute"</i></div>';
          else
            alcohol_html =
              "</div><div><b>Alcohol Content: </b>" +
              topHitOfYear.beer_abv +
              "%</div>";
          html =
            "<h3>" +
            "Guess Who's Most Popular This Year?" +
            "</h3>" +
            "<div><b>Beer Name: </b>" +
            topHitOfYear.beer_name +
            alcohol_html +
            "<div><b>Beer Style: </b>" +
            topHitOfYear.beer_style +
            "</div>";
          $("#thoty-result").append(html);
        });
      }
    } else {
      alert("It's not working!");
    }
  };
  request.send();
});

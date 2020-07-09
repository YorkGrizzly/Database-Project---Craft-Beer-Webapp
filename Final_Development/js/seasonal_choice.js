$("#season").change(function () {
  season_param = "?season=" + $("#season").val();
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "http://localhost:4000/seasonal_choice" + season_param,
    true
  );
  request.onload = function () {
    var result = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      let alcohol_html;
      result.data.forEach((seasonalChoice) => {
        if (seasonalChoice.beer_abv === null)
          alcohol_html =
            '</div><div><b>Alcohol Content</b>: <i>"Sorry, There is Currently No Data Available for this Attribute"</i></div>';
        else
          alcohol_html =
            "</div><div><b>Alcohol Content: </b>" +
            seasonalChoice.beer_abv +
            "%</div>";
        html =
          "<h3>The Choice of the Season: " +
          "</h3>" +
          "<div><b>Beer Name: </b>" +
          seasonalChoice.beer_name +
          alcohol_html +
          "<div><b>Beer Style: </b>" +
          seasonalChoice.beer_style +
          "</div>";
        $("#season-result").html(html);
      });
    } else {
      alert("It's not working!");
    }
  };
  request.send();
});

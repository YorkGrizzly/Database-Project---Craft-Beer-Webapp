$("#rank-beers-btn").click(function () {
  $("#rank-result").html("<br/><i>Running...</i>");
  param =
    "?min_ratings=" +
    $("#min-ratings").val() +
    "&rank_by=" +
    $("input[name='rank-by']:checked").val();
  //   console.log(year_param);
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:4000/rank_beers" + param, true);
  request.onload = function () {
    var result = JSON.parse(this.response);
    console.log(result);
    if (request.status >= 200 && request.status < 400) {
      $("#rank-result").html("");
      //   if (result["data"].length == 0) {
      //     html =
      //       "<h3><i>Sorry, There Are Currently No Available Data For These Conditions...</i></h3>";
      //     $("#rank-result").append(html);
      //   } else {
      // let alcohol_html;
      let rankCnt = 0;
      result.data.forEach((rankedBeer) => {
        rankCnt += 1;
        //   if (rankedBeer.beer_abv === null)
        //     alcohol_html =
        //       '</div><div><b>Alcohol Content</b>: <i>"Sorry, There is Currently No Data Available for this Attribute"</i></div>';
        //   else
        //     alcohol_html =
        //       "</div><div><b>Alcohol Content: </b>" +
        //       rankedBeer.beer_abv +
        //       "%</div>";
        html =
          "<h3>#" +
          rankCnt +
          "</h3>" +
          "<div><b>Beer Id: </b>" +
          rankedBeer.beer_id +
          "<div><b>Beer Name: </b>" +
          rankedBeer.beer_name +
          // alcohol_html +
          "<div><b>" +
          $("input[name='rank-by']:checked").val() +
          " rating: </b>" +
          rankedBeer[$("input[name='rank-by']:checked").val()] +
          "</div><br/>";
        $("#rank-result").append(html);
      });
      //   }
    } else {
      alert("It's not working!");
    }
  };
  request.send();
});

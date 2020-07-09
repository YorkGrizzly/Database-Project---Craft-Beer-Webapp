var request = new XMLHttpRequest();
request.open("GET", "http://localhost:4000/top_ten", true);
$("#top10-board").html("<br/><i>Running...</i>");
request.onload = function () {
  var result = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    $("#top10-board").html("");
    var breweryRank = 0;
    result.data.forEach((brewery) => {
      breweryRank += 1;
      var html =
        "<br /><div>#" +
        breweryRank +
        "</div><div><b>Brewery Name</b>: " +
        brewery.brewery_name +
        "</div><div><b>Average Review</b>: " +
        brewery.avg_review +
        "</div>";
      $("#top10-board").append(html);
    });
  } else {
    alert("It's not working!");
  }
};
request.send();

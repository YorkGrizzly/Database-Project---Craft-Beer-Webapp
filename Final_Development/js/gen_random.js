document.getElementById("random-gen-btn").onclick = function () {
  var rand_request = new XMLHttpRequest();
  rand_request.open("GET", "http://localhost:4000/gen_rand", true);
  rand_request.onload = function () {
    var rand_result = JSON.parse(this.response);
    if (rand_request.status >= 200 && rand_request.status < 400) {
      rand_result.data.forEach((rand_gen) => {
        let alcohol_html;
        if (rand_gen.beer_abv === null)
          // handle when content is null
          alcohol_html =
            '</div><div><b>Alcohol Content</b>: <i>"Sorry, There is Currently No Data Available for this Attribute"</i></div>';
        else
          alcohol_html =
            "</div><div><b>Alcohol Content</b>: " +
            rand_gen.beer_abv +
            "%</div>";
        let html =
          "<br/><div><i>Have You Given This a Try ??</i><br /><br /></div><div><b>Beer Name</b>: " +
          rand_gen.beer_name +
          alcohol_html +
          "<div><b>Beer Style</b>: " +
          rand_gen.beer_style +
          "</div><br />";
        $("#rand-result").html(html);
      });
    } else {
      alert("It's not working!");
    }
  };
  rand_request.send();
};

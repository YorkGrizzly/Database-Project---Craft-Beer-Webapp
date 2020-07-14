$("#add-review-btn").click(function () {
  check_param = "?beer_id=" + $("#review-beer-id").val();
  var beer_request = new XMLHttpRequest();
  beer_request.open(
    "GET",
    "http://localhost:4000/check_beer_id" + check_param,
    true
  );
  beer_request.onload = function () {
    if (beer_request.status >= 200 && beer_request.status < 400) {
      var result = JSON.parse(this.response);
      // console.log(result["data"].length);
      if (result["data"].length == 0) {
        alert("Sorry, the beer you're rating does not exist!");
      } else {
        $("#add-review-result").html("<br/><i>Running...</i>");
        param =
          "?profilename=" +
          $("#usr-add").val() +
          "&beer_id=" +
          $("#review-beer-id").val() +
          "&add_overall=" +
          $("#add-overall").val() +
          "&add_aroma=" +
          $("#add-aroma").val() +
          "&add_taste=" +
          $("#add-taste").val() +
          "&add_palate=" +
          $("#add-palate").val() +
          "&add_appearance=" +
          $("#add-appearance").val();

        var request = new XMLHttpRequest();
        // console.log(param);

        request.open("GET", "http://localhost:4000/add_review" + param, true);
        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            $("#add-review-result").html("");
            // console.log($("#usr-add").val());
            // console.log($("#review-beer-id").val());
            // console.log($("#add-overall").val());
            // console.log($("#add-aroma").val());
            // console.log($("#add-taste").val());
            // console.log($("#add-palate").val());
            // console.log($("#add-appearance").val());
            alert("Your review has been submitted. Thank you for your review!");
            //   }
          } else {
            alert("It's not working!");
          }
        };
        request.send();
      }
    } else {
      alert("It's not Working for the Check ID!");
    }
  };
  beer_request.send();
});

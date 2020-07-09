$("#edit-review-btn").click(function () {
  $("#edit-review-result").html("<br/><i>Running...</i>");
  param =
    "?edit_review_id=" +
    $("#usr-edit").val() +
    "&edit_overall=" +
    $("#edit-overall").val() +
    "&edit_aroma=" +
    $("#edit-aroma").val() +
    "&edit_taste=" +
    $("#edit-taste").val() +
    "&edit_palate=" +
    $("#edit-palate").val() +
    "&edit_appearance=" +
    $("#edit-appearance").val();

  var request = new XMLHttpRequest();
  console.log(param);
  request.open("GET", "http://localhost:4000/edit_review" + param, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      $("#edit-review-result").html("");
      console.log($("#usr-edit").val());
      console.log($("#edit-overall").val());
      console.log($("#edit-aroma").val());
      console.log($("#edit-taste").val());
      console.log($("#edit-palate").val());
      console.log($("#edit-appearance").val());
      alert("Your review has been modified. Thank you for your review!");
      //   }
    } else {
      alert("It's not working!");
    }
  };
  request.send();
});

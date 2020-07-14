var getParams = function (url) {
  var params = {};
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

var query = getParams(window.location.href);
var request = new XMLHttpRequest();
if (query.usr_name != "" && query.usr_name != null) {
  request.open(
    "GET",
    "http://localhost:4000/search/user_name/" + query.usr_name,
    true
  );
} else {
  request.open("GET", "http://localhost:4000/review/", true);
}

request.onload = function () {
  var result = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    document.getElementById("search-usr-btn").onclick = function () {
      if (result.data == "") {
        const parent = document.getElementById("review-result");
        const html = document.createElement("div");
        const breakline = document.createElement("br");
        html.textContent = "Sorry, No Matching Results Can be Found...";
        parent.appendChild(breakline);
        parent.appendChild(html);
      } else {
        const parent = document.getElementById("review-result");
        const div = document.createElement("div");
        div.setAttribute("class", "table-responsive-md");
        parent.appendChild(div);

        const table = document.createElement("div");
        table.setAttribute("class", "table table-striped");
        div.appendChild(table);

        const tableHead = document.createElement("thead");
        const tableBody = document.createElement("tbody");

        const header = document.createElement("tr");

        const th1 = document.createElement("th");
        th1.textContent = "Beer ID";
        const th2 = document.createElement("th");
        th2.textContent = "Beer Name";
        const th3 = document.createElement("th");
        th3.textContent = "Overall Score";
        const th4 = document.createElement("th");
        th4.textContent = "Aroma";
        const th5 = document.createElement("th");
        th5.textContent = "Appearance";
        const th6 = document.createElement("th");
        th6.textContent = "Palate";
        const th7 = document.createElement("th");
        th7.textContent = "Taste";
        const th8 = document.createElement("th");
        th8.textContent = "Date";
        const th9 = document.createElement("th");
        th9.textContent = "Review User";

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableHead.appendChild(header);
        header.appendChild(th1);
        header.appendChild(th2);
        header.appendChild(th3);
        header.appendChild(th4);
        header.appendChild(th5);
        header.appendChild(th6);
        header.appendChild(th7);
        header.appendChild(th8);
        header.appendChild(th9);

        result.data.forEach((review) => {
          const row = document.createElement("tr");

          const h1 = document.createElement("td");
          h1.textContent = review.beer_id;

          const p1 = document.createElement("td");
          p1.textContent = `${review.beer_name}`;

          const p2 = document.createElement("td");
          p2.textContent = `${review.review_overall}`;

          const p3 = document.createElement("td");
          p3.textContent = `${review.review_aroma}`;

          const p4 = document.createElement("td");
          p4.textContent = `${review.review_appearance}`;

          const p5 = document.createElement("td");
          p5.textContent = `${review.review_palate}`;

          const p6 = document.createElement("td");
          p6.textContent = `${review.review_taste}`;

          const p7 = document.createElement("td");
          p7.textContent = `${review.review_time}`;

          const p8 = document.createElement("td");
          p8.textContent = `${review.review_profilename}`;

          tableBody.appendChild(row);
          row.appendChild(h1);
          row.appendChild(p1);
          row.appendChild(p2);
          row.appendChild(p3);
          row.appendChild(p4);
          row.appendChild(p5);
          row.appendChild(p6);
          row.appendChild(p7);
          row.appendChild(p8);
        });
      }
    };
  } else {
    alert("It's not working!");
  }
};

request.send();

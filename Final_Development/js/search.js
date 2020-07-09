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
if (query.by == "by_name") {
  request.open(
    "GET",
    "http://localhost:4000/search/beer_name/" + query.name,
    true
  );
  request.onload = function () {
    var result = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      if (result.data == "") {
        const parent = document.getElementById("search-result");
        const html = document.createElement("div");
        const breakline = document.createElement("br");
        html.textContent = "Sorry, No Matching Results Can be Found...";
        parent.appendChild(breakline);
        parent.appendChild(html);
      } else {
        const parent = document.getElementById("search-result");
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
        th1.textContent = "Name";
        const th2 = document.createElement("th");
        th2.textContent = "Abv";
        const th3 = document.createElement("th");
        th3.textContent = "Style";
        const th4 = document.createElement("th");
        th4.textContent = "Overall Review";
        const th5 = document.createElement("th");
        th5.textContent = "Beer ID";

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableHead.appendChild(header);
        header.appendChild(th1);
        header.appendChild(th2);
        header.appendChild(th3);
        header.appendChild(th4);
        header.appendChild(th5);

        result.data.forEach((beer) => {
          const row = document.createElement("tr");

          const h1 = document.createElement("td");
          h1.textContent = beer.beer_name;

          const p1 = document.createElement("td");
          if (`${beer.beer_abv}` == "null")
            p1.textContent = "No Data Available";
          else p1.textContent = `${beer.beer_abv}`;

          const p2 = document.createElement("td");
          p2.textContent = `${beer.beer_style}`;

          const p3 = document.createElement("td");
          p3.textContent = `${beer.review_overall}`;

          const p4 = document.createElement("td");
          p4.textContent = `${beer.beer_id}`;

          tableBody.appendChild(row);
          row.appendChild(h1);
          row.appendChild(p1);
          row.appendChild(p2);
          row.appendChild(p3);
          row.appendChild(p4);
        });
      }
    } else {
      alert("It's not working!");
    }
  };
} else if (query.by == "by_brewery") {
  request.open(
    "GET",
    "http://localhost:4000/search/brewery_name/" + query.name,
    true
  );
  request.onload = function () {
    var result = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      if (result.data == "") {
        const parent = document.getElementById("search-result");
        const html = document.createElement("div");
        const breakline = document.createElement("br");
        html.textContent = "Sorry, No Matching Results Can be Found...";
        parent.appendChild(breakline);
        parent.appendChild(html);
      } else {
        const parent = document.getElementById("search-result");
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
        th1.textContent = "Name";
        const th2 = document.createElement("th");
        th2.textContent = "Abv";
        const th3 = document.createElement("th");
        th3.textContent = "Style";
        const th4 = document.createElement("th");
        th4.textContent = "Brewery Name";

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableHead.appendChild(header);
        header.appendChild(th1);
        header.appendChild(th2);
        header.appendChild(th3);
        header.appendChild(th4);

        result.data.forEach((beer) => {
          const row = document.createElement("tr");

          const h1 = document.createElement("td");
          h1.textContent = beer.beer_name;

          const p1 = document.createElement("td");
          if (`${beer.beer_abv}` == "null")
            p1.textContent = "No Data Available";
          else p1.textContent = `${beer.beer_abv}`;

          const p2 = document.createElement("td");
          p2.textContent = `${beer.beer_style}`;

          const p3 = document.createElement("td");
          p3.textContent = `${beer.brewery_name}`;

          tableBody.appendChild(row);
          row.appendChild(h1);
          row.appendChild(p1);
          row.appendChild(p2);
          row.appendChild(p3);
        });
      }
    } else {
      alert("It's not working!");
    }
  };
}

request.send();

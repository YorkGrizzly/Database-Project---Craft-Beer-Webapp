var request = new XMLHttpRequest();
request.open("GET", "http://localhost:4000/top_ten", true);
request.onload = function () {
  var result = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
  } else {
    alert("It's not working!");
  }
};

request.send();

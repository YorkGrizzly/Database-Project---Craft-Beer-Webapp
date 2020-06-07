const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:4000/beers', true)
request.onload = function() {
  // Begin accessing JSON data here
  var result = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    result.data.forEach(beer => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('h1')
      h1.textContent = beer.name

      const p1 = document.createElement('p')
      p1.textContent = "Style: " + `${beer.style}`

      const p2 = document.createElement('p')
      p2.textContent = "Alchoholic content: " + `${beer.abv}`

      const p3 = document.createElement('p')
      p3.textContent = "International bittering units: " + `${beer.ibu}`

      const p4 = document.createElement('p')
      p4.textContent = "Ounces: " + `${beer.ounces}`

      const p5 = document.createElement('p')
      p5.textContent = "Brewery ID: " + `${beer.brewery_id}`

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p1)
      card.appendChild(p2)
      card.appendChild(p3)
      card.appendChild(p4)
      card.appendChild(p5)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
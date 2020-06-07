const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container-fluid')

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:4000/breweries', true)
request.onload = function() {
  // Begin accessing JSON data here
  var result = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    const div = document.createElement('div')
    div.setAttribute('class', 'table-responsive-md')
    container.appendChild(div)

    const table = document.createElement('div')
    table.setAttribute('class', 'table table-striped')
    div.appendChild(table)

    const tableHead = document.createElement('thead')
    const tableBody = document.createElement('tbody')

    const header = document.createElement('tr')

    const th1 = document.createElement('th')
    th1.textContent = "Name"
    const th2 = document.createElement('th')
    th2.textContent = "City"
    const th3 = document.createElement('th')
    th3.textContent = "State"

    table.appendChild(tableHead)
    table.appendChild(tableBody)
    tableHead.appendChild(header)
    header.appendChild(th1)
    header.appendChild(th2)
    header.appendChild(th3)

    result.data.forEach(brewery => {
      const row = document.createElement('tr')

      const h1 = document.createElement('td')
      h1.textContent = brewery.name

      const p1 = document.createElement('td')
      p1.textContent = `${brewery.city}`

      const p2 = document.createElement('td')
      p2.textContent = `${brewery.state}`

      tableBody.appendChild(row)
      row.appendChild(h1)
      row.appendChild(p1)
      row.appendChild(p2)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
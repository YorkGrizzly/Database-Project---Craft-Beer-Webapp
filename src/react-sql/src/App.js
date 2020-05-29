import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    breweries:[],
    brewery: {
      name: 'newbrewer',
      city: 'Hsinchu',
      state: 'HS'
    }
  }

  componentDidMount(){
    this.getBreweries();
  }

  // handleInputChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // }

  getBreweries = _ => {
    fetch('http://localhost:4000/breweries')
      .then(response => response.json())
      .then(response => this.setState({breweries: response.data}))
      .catch(err => console.error(err))
    
  }

  addBrewery = _ => {
    const { brewery } = this.state;
    fetch (`http://localhost:4000/breweries/add?names=${brewery.name}&city=${brewery.city}&state=${brewery.state}`)
      .then(this.getBreweries)
      .catch(err => console.error(err))
  }

  renderBrewery = ({brewery_id, name, city, state, logged_at}) => <div key={brewery_id}>{name} {city} {state} {logged_at}</div>

  render() {
    const { breweries, brewery } = this.state;
    return( 
      <div className="App">
        {breweries.map(this.renderBrewery)}
        <div>
          <input 
          value={brewery.name}
          onChange={e => this.setState({ brewery: { ...brewery, name: e.target.value }})} />
          <input
          value={brewery.city}
          onChange={e => this.setState({ brewery: { ...brewery, city: e.target.value }})}/>
          <input
          value={brewery.state}
          onChange={e => this.setState({ brewery: { ...brewery, state: e.target.value }})}/>
          <button onClick={this.addBrewery} >Add Brewery</button>
      <br></br>
      <br></br>
      <br></br>
        </div>
      </div>
    );
  }
}

export default App;

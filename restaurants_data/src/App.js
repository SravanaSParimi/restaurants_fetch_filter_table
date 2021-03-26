import React, { Component } from 'react';
import './App.css';
import RestaurantFilters from './components/RestaurantFilters';
import RestaurantsTable from './components/RestaurantsTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        change : 1,
        stateChangeVal : "",
        genreChangeVal : "",
        handleSearchVal: ""
    }
    this.stateChange = this.stateChange.bind(this)
    this.genreChange = this.genreChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  stateChange (val) {
      this.setState( { change: this.state.change + 1, stateChangeVal: val})
  }

  genreChange (val) {
      this.setState( { change: this.state.change + 1, genreChangeVal: val})
  }

  handleSearch (val) {
    this.setState({ change: this.state.change + 1, handleSearchVal: val })
  }

  componentDidMount() {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", 
        { 
            headers: { Authorization: "Api-Key q3MNxtfep8Gt", }, 
        })
        .then(response => response.json())
        .then(data => this.setState({ data: data }));
  }

  render() {
    let dataToRender = this.state.data
    if(this.state.stateChangeVal !== "" && this.state.stateChangeVal !== "all") {
      dataToRender = dataToRender.filter(d => d.state === this.state.stateChangeVal );
    } 
    if(this.state.genreChangeVal !== "" && this.state.genreChangeVal !== "all"){
      dataToRender = dataToRender.filter(d => d.genre.includes(this.state.genreChangeVal));
    }
    if(this.state.handleSearchVal !== "") {
      dataToRender = dataToRender.filter(d => {
        return d.name.includes(this.state.handleSearchVal) || d.city.includes(this.state.handleSearchVal) || d.genre.includes(this.state.handleSearchVal)
      })
    }


    return (
      <div className="App">
        <RestaurantFilters data = {this.state.data} stateChange = { this.stateChange } stateChangeVal = {this.state.stateChangeVal} genreChange = { this.genreChange } genreChangeVal = {this.state.genreChangeVal} handleSearch= {this.handleSearch}/>

        <table className="restaurant_table">
          <tr>
            <th> Name </th>
            <th> City </th>
            <th> State </th>
            <th> Phone Number </th>
            <th> Genre </th>
          </tr>
          <RestaurantsTable tableData = {dataToRender} />
        </table>
        
      </div>
    );
  }
 
}

export default App;

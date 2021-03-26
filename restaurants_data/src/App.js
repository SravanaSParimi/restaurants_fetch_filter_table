import React, { Component } from 'react';
import './App.css';
import Pagination from './components/Pagination';
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
        handleSearchVal: "",
        currentPage: 1,
        perPage: 10
    }
    this.stateChange = this.stateChange.bind(this)
    this.genreChange = this.genreChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.goToPage = this.goToPage.bind(this)
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

  goToPage(pageNumber) {
    this.setState({ currentPage: pageNumber })
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
    let dataToRender = this.state.data;
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
          <thead>
            <tr>
              <th> Name </th>
              <th> City </th>
              <th> State </th>
              <th> Phone Number </th>
              <th> Genre </th>
            </tr>
          </thead>
         
          <RestaurantsTable tableData = {dataToRender} currentPage = {this.state.currentPage} perPage = {this.state.perPage} />
          
        </table>
        <Pagination totalDataRows = {dataToRender.length} perPage={this.state.perPage} goToPage = {this.goToPage}/>
        
      </div>
    );
  }
 
}

export default App;

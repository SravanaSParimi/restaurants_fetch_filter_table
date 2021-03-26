import React, { useRef } from 'react'
import './restaurants.css'

function RestaurantFilters (props) {

    const data = props.data;
    const unique_states = [...new Set(data.map(d => d.state))]
    const unique_genre = [...new Set([].concat(...data.map(d => d.genre.split(','))))]
    const textSearch = useRef(null)
    const stateChange = event => props.stateChange(event.target.value)
    const genreChange = event => props.genreChange(event.target.value)
    const handleButtonSearch = event => {
        props.handleSearch(textSearch.current.value)
    }
    const handleKeyPressSearch = event => {
        if(event.code === "Enter") {
            props.handleSearch(event.target.value)
        }
    }
    const handleOnChangeToClear = event => {
        if(event.target.value === "") {
            props.handleSearch(event.target.value)
        }
    }
    return (
        <div className="restaurants_filters">
           <select id="stateSelect" onChange = {stateChange} value = {props.stateChangeVal !== "" ? props.stateChangeVal : "all"}>
                <option key="default_all" value='all'> All </option>
                {unique_states.map((state, id) => 
                    <option key={id} value = {state}> {state} </option>
                )}
           </select>
           <select id="genreSelect" onChange = {genreChange} value = {props.genreChangeVal !== "" ? props.genreChangeVal : "all"}>
                <option key="default_all" value='all'> All </option>
                    {unique_genre.map((genre, id) => 
                        <option key={id} value = {genre}> {genre} </option>
                    )}
            </select>
            <div>
                <input type="text" placeholder="Search" onKeyPress={ handleKeyPressSearch} onChange= { handleOnChangeToClear } ref= {textSearch} />
                <button type="button" onClick={ handleButtonSearch } > Click to filter! </button>
            </div>
        </div>
    )
}

export default RestaurantFilters

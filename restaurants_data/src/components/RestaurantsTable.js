import React from 'react';
import './restaurants.css';

function RestaurantsTable (props) {

      const data = props.tableData;
      data.sort((a, b) => {
          if(a.name < b.name) {
              return -1;
          } else if (a.name > b.name) {
              return 1;
          } else return 0;
      });
      if(data.length === 0) {
        return (
          <tr>
            <td colSpan="5"> No records to display..</td>
          </tr>
        );
      } else {
        return (
          data.map(d => 
            <tr key={d.id}>
                <td> {d.name} </td>
                <td> {d.city} </td>
                <td> {d.state} </td>
                <td> {d.telephone} </td>
                <td> {d.genre} </td>
            </tr>
          ));
      }     
    }
   
  
  export default RestaurantsTable;
  
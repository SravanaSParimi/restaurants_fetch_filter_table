import React from 'react'
import './pagination.css'

const Pagination = (props) => {
    const pageNumbers = [];
    const goToPage = event => props.goToPage(event.target.innerHTML)

    for(let i=1; i <= Math.ceil(props.totalDataRows / props.perPage); i++) {
      pageNumbers.push(i);
    }
    return (  
        pageNumbers.map(p => 
            <span key={p} className="pagination_span"> 
                <a onClick= { goToPage } href="!#"> {p} </a>
            </span>
        ) 
    );
}

export default Pagination

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function RecentSalesTable({ sdg }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCars, setFilteredCars] = useState(sdg);

    // Function to handle changes in the search input
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Filter carss based on the search query
        const filtered = sdg.filter((sdg) => (
            (sdg.country && sdg.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (sdg.code && sdg.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (sdg.year && sdg.year.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (sdg.prevalence && String(sdg.prevalence).toLowerCase().includes(searchQuery.toLowerCase())) 
          ));
        setFilteredCars(filtered);
    };

    return (
        <div className = "search-container">
            
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={` Search...`} // Using the Font Awesome search icon
                style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='${encodeURIComponent(
                        faSearch.icon[4]
                    )}'/></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left',
                    paddingLeft: '30px', // Adjust padding-left to ensure space for the icon
                    paddingRight: '10px' // Adjust padding-right to ensure space for the text
                }}
            />
            <table className='table table-borderless datatable'>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">Code</th>
                        <th scope="col">Date</th>
                        <th scope="col">Prevalence</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCars.map((sdg, index) => (
                        <tr key={index}>
                            <td>{sdg.country}</td>
                            <td>{sdg.code}</td>
                            <td>{sdg.date}</td>
                            <td>{sdg.prevalence}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentSalesTable;

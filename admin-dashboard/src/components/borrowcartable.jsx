import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const { id: _ } = useParams();
  const [borrowcarlists, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [sortConfig, setSortConfig] = useState(null);

  // Function to fetch data initially
  const fetchData = () => {
    fetch("http://localhost:5000/getborrow-cars")
      .then((res) => res.json())
      .then((borrowcarlists) => {
        setCards(borrowcarlists);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]); // Include currentPage and searchQuery in dependency array

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = borrowcarlists.filter((borrowcar) =>
    borrowcar.CarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    borrowcar.Power.toLowerCase().includes(searchQuery.toLowerCase()) ||
    borrowcar.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    borrowcar.Provincecity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = filteredAndSortedData.slice(indexOfFirstData, indexOfLastData);

  return (
    <div className="row">
      <div className="w-120 bg-white rounded p-4">
        <form className="form-inline my-2 my-lg-0">
          <input
            type="text"
            placeholder="Search by Country/Continent Name"
            className="form-control mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <table className="table table-borderless datatable">
          <thead className="thead-light">
            <tr>
              <th scope="col">Car Name</th>
              <th scope="col">Power</th>
              <th scope="col">Rented By</th>
              <th scope="col">Province/City</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((borrowcar, index) => (
              <tr key={index}>
                <td>{borrowcar.CarName}</td>
                <td>{borrowcar.Power}</td>
                <td>{borrowcar.Name}</td>
                <td>{borrowcar.Provincecity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredAndSortedData.length / perPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => setCurrentPage(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UsersTable;

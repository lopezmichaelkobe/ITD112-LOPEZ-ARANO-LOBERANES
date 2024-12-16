import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const { id: _ } = useParams();
  const [sdg, setSDG] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(150);
  const [sortConfig, setSortConfig] = useState({ key: "country", direction: "asc" }); // State for sorting

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const cars = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Convert Timestamp fields to readable format
          return {
            id: doc.id, // Include the document ID if needed
            ...data,
            year: data.year?.toDate ? data.year.toDate().toISOString().split("T")[0] : data.year, // Convert Timestamp to YYYY-MM-DD
          };
        });
        setSDG(cars);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  // Sort function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (!a[key] || !b[key]) return 0; // Handle missing values
      const valueA = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
      const valueB = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Fixing the filter logic to handle null or undefined values safely
  const filteredCars = sdg
    .filter((car) => {
      const query = searchQuery.toLowerCase();
      return (
        (car.country && car.country.toLowerCase().includes(query)) ||
        (car.code && car.code.toLowerCase().includes(query)) ||
        (car.year && car.year.toLowerCase().includes(query)) ||
        (car.prevalence && String(car.prevalence).toLowerCase().includes(query)) ||
        (car.prevalence && String(car.continent).toLowerCase().includes(query))
      );
    });

  // Apply sorting
  const sortedCars = sortData(filteredCars, sortConfig.key, sortConfig.direction);

  // Pagination calculation
  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = sortedCars.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

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
              <th scope="col" onClick={() => handleSort("country")}>
                Country {sortConfig.key === "country" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th scope="col" onClick={() => handleSort("code")}>
                Code {sortConfig.key === "code" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th scope="col" onClick={() => handleSort("year")}>
                Year {sortConfig.key === "year" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th scope="col" onClick={() => handleSort("continent")}>
                Continent {sortConfig.key === "continent" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th scope="col" onClick={() => handleSort("prevalence")}>
                Prevalence {sortConfig.key === "prevalence" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((car, index) => (
              <tr key={index}>
                <td>{car.country}</td>
                <td>{car.code}</td>
                <td>{car.year}</td>
                <td>{car.continent}</td>
                <td>{car.prevalence}</td>
                <td className=""></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredCars.length / perPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
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

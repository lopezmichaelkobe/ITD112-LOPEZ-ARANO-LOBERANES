import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure this is the correct path to Firebase.js

function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const cars = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Include the document ID
            ...data,
            year: data.year?.toDate ? data.year.toDate().toISOString().split("T")[0] : data.year, // Format year
          };
        });
        setCars(cars);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  // Delete document from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cars", id));
      console.log(`Document with ID ${id} deleted.`);
      // Refresh data after deletion
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error.message);
    }
  };

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

  // Update sorting configuration
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort cars
  const filteredCars = cars.filter((car) => {
    const query = searchQuery.toLowerCase();
    return (
      (car.country && car.country.toLowerCase().includes(query)) ||
      (car.code && car.code.toLowerCase().includes(query)) ||
      (car.year && car.year.toLowerCase().includes(query)) ||
      (car.prevalence && String(car.prevalence).toLowerCase().includes(query)) ||
      (car.continent && car.continent.toLowerCase().includes(query))
    );
  });

  const sortedCars = sortConfig.key
    ? sortData(filteredCars, sortConfig.key, sortConfig.direction)
    : filteredCars;

  // Pagination calculation
  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = sortedCars.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="row">
      <div className="w-120 bg-white rounded p-4">
        <form className="form-inline my-2 my-lg-0">
          <input
            type="text"
            placeholder="Search"
            className="form-control mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <table className="table table-borderless datatable">
          <thead className="thead-light">
            <tr>
              <th scope="col" onClick={() => requestSort("country")}>Country</th>
              <th scope="col" onClick={() => requestSort("code")}>Code</th>
              <th scope="col" onClick={() => requestSort("year")}>Year</th>
              <th scope="col" onClick={() => requestSort("prevalence")}>Prevalence</th>
              <th scope="col" onClick={() => requestSort("continent")}>Continent</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((car, index) => (
              <tr key={index}>
                <td>{car.country}</td>
                <td>{car.code}</td>
                <td>{car.year}</td>
                <td>{car.prevalence}</td>
                <td>{car.continent}</td>
                <td>
                  <Link to={`/edit/${car.id}`} className="btn btn-outline-success mx-2">Update</Link>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="btn btn-outline-danger mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredCars.length / perPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
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

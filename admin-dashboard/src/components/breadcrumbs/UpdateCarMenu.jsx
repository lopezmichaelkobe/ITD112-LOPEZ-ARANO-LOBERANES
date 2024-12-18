import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure the correct path to your Firebase configuration file

function UpdateCarMenu() {
  const { id } = useParams();

  const [Country, setCountry] = useState("");
  const [Code, setCode] = useState("");
  const [Year, setYear] = useState("");
  const [Prevalence, setPrevalence] = useState("");
  const [Continent, setContinent] = useState("");

  const navigate = useNavigate();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCountry(data.country || "");
          setCode(data.code || "");
          setYear(data.year || "");
          setPrevalence(data.prevalence || "");
          setContinent(data.continent || "");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error.message);
      }
    };

    fetchData();
  }, [id]);

  // Update document in Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "cars", id);
      await updateDoc(docRef, {
        country: Country,
        code: Code,
        year: Year,
        prevalence: Prevalence,
        continent: Continent,
      });
      console.log("Document updated successfully!");
      navigate("/edit-car");
    } catch (error) {
      console.error("Error updating document: ", error.message);
    }
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update Country Details</h2>
          <div className="mb-2">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter Country"
              className="form-control"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              id="code"
              placeholder="Enter Code"
              className="form-control"
              value={Code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="year">Year</label>
            <input
                type="date" // Changed from "text" to "date"
                id="year"
                className="form-control"
                value={Year}
                onChange={(e) => setYear(e.target.value)}
            />
            </div>
          <div className="mb-2">
            <label htmlFor="prevalence">Prevalence</label>
            <input
              type="text"
              id="prevalence"
              placeholder="Enter Prevalence"
              className="form-control"
              value={Prevalence}
              onChange={(e) => setPrevalence(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="continent">Continent</label>
            <input
              type="text"
              id="continent"
              placeholder="Enter Continent"
              className="form-control"
              value={Continent}
              onChange={(e) => setContinent(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCarMenu;

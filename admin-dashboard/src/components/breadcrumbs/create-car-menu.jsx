import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // Import Firestore instance from your Firebase configuration
import { collection, addDoc } from "firebase/firestore";

function CreateUser() {
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");
  const [year, setYear] = useState("");
  const [prevalence, setPrevalence] = useState("");
  const [continent, setContinent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a document to the "cars" collection
      const carsCollectionRef = collection(db, "cars");
      await addDoc(carsCollectionRef, {
        country,
        code,
        year,
        prevalence,
        continent,
      });
      console.log("Document successfully written!");
      navigate("/dashboard-main");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Country</h2>
          <div className="mb-2">
            <label htmlFor="">Country</label>
            <input
              type="text"
              placeholder="Enter Country"
              className="form-control"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Code</label>
            <input
              type="text"
              placeholder="Enter Code"
              className="form-control"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Year</label>
            <input
              type="text"
              placeholder="Enter Year"
              className="form-control"
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Prevalence</label>
            <input
              type="text"
              placeholder="Enter Prevalence"
              className="form-control"
              onChange={(e) => setPrevalence(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Continent</label>
            <select
              className="form-select"
              onChange={(e) => setContinent(e.target.value)}
              required
            >
              <option value="">Choose a Continent</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <button className="btn btn-outline-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;

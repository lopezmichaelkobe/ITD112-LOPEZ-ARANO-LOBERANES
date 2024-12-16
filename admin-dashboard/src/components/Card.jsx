import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Ensure this points to your Firebase initialization file
import './card.css';

function Card() {
  const [cars, setCars] = useState([]);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalAve, setTotalAve] = useState(0);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsCollection = collection(db, 'cars');
        const carDocs = await getDocs(carsCollection);

        // Extract data from Firestore documents
        const carsData = carDocs.docs.map(doc => doc.data());
        setCars(carsData);

        // Calculate distinct countries
        const countries = new Set(carsData.map(car => car.country));
        setTotalCountries(countries.size);

         // Calculate total average prevalence
         const totalPrevalence = carsData.reduce(
          (sum, car) => sum + (parseFloat(car.prevalence) || 0),
          0
        );
        const averagePrevalence = carsData.length
          ? (totalPrevalence / carsData.length).toFixed(2)
          : 0;
        setTotalAve(averagePrevalence);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">Total Data Stored</h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-database"></i>
              </div>
              <div className="ps-3">
                <h6>{cars.length}</h6> {/* Total number of cars */}
                <span className="text-success small pt-1 fw-bold">20%</span>
                <span className="text-muted small pt-2 ps-1">Increase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">Total Number of Countries</h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-globe"></i>
              </div>
              <div className="ps-3">
                <h6>{totalCountries}</h6> {/* Total number of distinct countries */}
                <span className="text-success small pt-1 fw-bold">3</span>
                <span className="text-muted small pt-2 ps-1">Users Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">Global Undernourishment (in %)</h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-percent"></i>
              </div>
              <div className="ps-3">
                <h6>{totalAve}</h6> {/* Average prevalence of undernourishment */}
                <span className="text-success small pt-1 fw-bold">104</span>
                <span className="text-muted small pt-2 ps-1">Users Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

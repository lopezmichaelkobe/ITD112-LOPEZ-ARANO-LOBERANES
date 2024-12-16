import React, { useState, useEffect } from 'react';
import './recentSales.css';
import RecentSalesTable from './RecentSalesTable';
import CardFilter from './CardFilter';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase'; // Firestore database instance

function RecentSales() {
  const [filter, setFilter] = useState('Today');
  const [sdg, setCards] = useState([]);

  const handleFilterChange = filter => {
    setFilter(filter);
  };

  const fetchData = async () => {
    try {
      // Reference to the Firestore collection
      const carsCollection = collection(db, "cars");
      const querySnapshot = await getDocs(carsCollection);

      // Map the Firestore documents to an array of objects
      const carsData = querySnapshot.docs.map(doc => ({
        id: doc.id, // Include document ID
        ...doc.data() // Spread the document fields
      }));

      console.log(carsData); // Debugging: Check fetched data in console
      setCards(carsData);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='card recent-sales overflow-auto'>
      <CardFilter filterChange={handleFilterChange} />
      <div className='card-body'>
        <h5 className='card-title'>
          Search for Data<span>|{filter}</span>
        </h5>
        <RecentSalesTable sdg={sdg} />
      </div>
    </div>
  );
}

export default RecentSales;

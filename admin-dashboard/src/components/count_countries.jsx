import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// Import Firebase functions
import { db } from './firebase'; // Make sure this path is correct
import { collection, getDocs } from 'firebase/firestore';

function WebTrafficChart1() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            // Reference the "cars" collection in Firestore
            const carsCollection = collection(db, 'cars');
            const snapshot = await getDocs(carsCollection);
            const carsData = snapshot.docs.map(doc => doc.data());

            // Process data to group countries by continent and count them
            const continentData = carsData.reduce((acc, car) => {
                const continent = car.continent;
                const country = car.country;

                // Check if the continent already exists in the accumulator
                let continentEntry = acc.find(item => item.name === continent);
                if (!continentEntry) {
                    // If the continent is not yet in the accumulator, add it
                    continentEntry = { name: continent, countries: new Set() };
                    acc.push(continentEntry);
                }

                // Add the country to the continent's Set of countries
                continentEntry.countries.add(country);

                return acc;
            }, []);

            // Convert the Set of countries to a count for each continent
            const countryCountData = continentData.map(item => ({
                name: item.name,
                value: item.countries.size, // Count of unique countries
            }));

            setData(countryCountData); // Update state with the processed data
        } catch (e) {
            console.log('Error fetching data:', e.message);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []); // Empty array ensures it only runs once when the component mounts

    useEffect(() => {
        const chartInstance = echarts.init(document.querySelector('#trafficChart2'));
        chartInstance.setOption({
            tooltip: { trigger: 'item' },
            legend: {
                top: '90%',
                left: 'center',
            },
            series: [
                {
                    name: 'Countries by Continent',
                    type: 'pie',
                    radius: ['40%', '70%'], // Adjusted for better visibility
                    avoidLabelOverlap: false,
                    label: {
                        formatter: '{b}: {c} ({d}%)',
                    },
                    labelLine: { show: true },
                    data: data, // Use country count data for the chart
                },
            ],
        });
    }, [data]);

    return (
        <div id="trafficChart2" style={{ minHeight: '500px', height: '500px' }}></div>
    );
}

export default WebTrafficChart1;

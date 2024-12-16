import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// Import Firebase functions
import { db } from './firebase'; // Ensure the path is correct
import { collection, getDocs } from 'firebase/firestore';

function WebTrafficChart1() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            // Reference the "cars" collection in Firestore
            const carsCollection = collection(db, 'cars');
            const snapshot = await getDocs(carsCollection);
            const carsData = snapshot.docs.map(doc => doc.data());

            // Process data to calculate total average of "prevalence" for each continent
            const continentData = carsData.reduce((acc, car) => {
                const { continent, prevalence } = car;

                if (!continent || typeof prevalence !== 'number') return acc; // Validate fields

                // Check if the continent already exists in the accumulator
                let continentEntry = acc.find(item => item.name === continent);
                if (!continentEntry) {
                    // If the continent is not yet in the accumulator, add it
                    continentEntry = { name: continent, totalPrevalence: 0, count: 0 };
                    acc.push(continentEntry);
                }

                // Accumulate prevalence and increment the count
                continentEntry.totalPrevalence += prevalence;
                continentEntry.count += 1;

                return acc;
            }, []);

            // Calculate the average prevalence for each continent
            const continentAvgData = continentData.map(item => ({
                name: item.name,
                value: (item.totalPrevalence / item.count).toFixed(2), // Calculate and format average
            }));

            setData(continentAvgData); // Update state with the processed data
        } catch (e) {
            console.log('Error fetching data:', e.message);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []); // Empty array ensures it only runs once when the component mounts

    useEffect(() => {
        const chartInstance = echarts.init(document.querySelector('#trafficChart1'));
        chartInstance.setOption({
            tooltip: { trigger: 'item' },
            legend: {
                top: '90%',
                left: 'center',
            },
            series: [
                {
                    name: 'Average Prevalence by Continent',
                    type: 'pie',
                    radius: ['0%', '70%'], // Adjusted for better visibility
                    avoidLabelOverlap: false,
                    label: {
                        formatter: '{b}: {c} ({d}%)',
                    },
                    labelLine: { show: true },
                    data: data, // Use average prevalence data for the chart
                },
            ],
        });

        // Dispose of the chart on unmount to prevent memory leaks
        return () => {
            chartInstance.dispose();
        };
    }, [data]);

    return (
        <div id="trafficChart1" style={{ minHeight: '500px', height: '500px' }}></div>
    );
}

export default WebTrafficChart1;

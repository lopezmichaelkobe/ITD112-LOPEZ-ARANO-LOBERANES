import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// Import Firebase functions
import { db } from './firebase'; // Make sure this path is correct
import { collection, getDocs } from 'firebase/firestore';

function WebTrafficChart() {
    const [data, setData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null); // Save the chart instance
    const [isAllHidden, setIsAllHidden] = useState(false); // State to track visibility toggle

    const fetchData = async () => {
        try {
            // Reference the "cars" collection in Firestore
            const carsCollection = collection(db, 'cars');
            const snapshot = await getDocs(carsCollection);
            const carsData = snapshot.docs.map(doc => doc.data());

            // Process data to match the format used in the Donut chart
            const processedData = carsData.reduce((acc, car) => {
                const country = car.country;
                const prevalence = car.prevalence;

                // Check if the country already exists in the accumulator
                const countryData = acc.find(item => item.name === country);
                if (countryData) {
                    countryData.value += prevalence; // Add the prevalence value
                } else {
                    acc.push({ name: country, value: prevalence });
                }

                return acc;
            }, []);

            setData(processedData); // Update state with the processed data
        } catch (e) {
            console.log('Error fetching data:', e.message);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []); // Empty array ensures it only runs once when component mounts

    useEffect(() => {
        const chartData = data.map(item => ({
            value: item.value,
            name: item.name, // Country name
        }));

        const chart = echarts.init(document.querySelector('#trafficChart'));
        setChartInstance(chart); // Save chart instance

        chart.setOption({
            tooltip: { trigger: 'item' },
            legend: {
                top: '70%',
                left: 'center',
                selected: Object.fromEntries(data.map(item => [item.name, !isAllHidden])), // Toggle visibility based on isAllHidden
            },
            series: [{
                top: '-350px',
                name: 'Total Prevalence (in %)',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: { show: false, position: 'center' },
                emphasis: {
                    label: { show: true, fontSize: '18', fontWeight: 'bold' },
                },
                labelLine: { show: false },
                data: chartData,
            }],
        });
    }, [data, isAllHidden]); // Re-render chart when data or visibility changes

    const toggleVisibility = () => {
        setIsAllHidden(prevState => !prevState); // Toggle the visibility state
    };

    return (
        <div>
            <button 
                className="btn btn-primary" 
                onClick={toggleVisibility} 
                style={{ marginBottom: '20px' }}
            >
                {isAllHidden ? 'Show All' : 'Hide All'}
            </button>
            <div id="trafficChart" style={{ minHeight: '1200px', height: '-1000px' }}></div>
        </div>
    );
}

export default WebTrafficChart;

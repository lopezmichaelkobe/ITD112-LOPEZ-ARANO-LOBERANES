import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function ReportCharts() {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ['#4154f1', '#2eca6a', '#ff771d'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        categories: [], // Continent names
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy hh:mm TT',
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsCollection = collection(db, 'cars');
        const snapshot = await getDocs(carsCollection);
        const carsData = snapshot.docs.map(doc => doc.data());

        // Group by continent and count the number of countries
        const continentCounts = carsData.reduce((acc, car) => {
          const { continent } = car;
          acc[continent] = (acc[continent] || 0) + 1;
          return acc;
        }, {});

        // Convert to chart format
        const continents = Object.keys(continentCounts);
        const counts = Object.values(continentCounts);

        setData(prevData => ({
          ...prevData,
          series: [{ name: 'Countries', data: counts }],
          options: {
            ...prevData.options,
            xaxis: {
              ...prevData.options.xaxis,
              categories: continents,
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      options={data.options}
      series={data.series}
      type={data.options.chart.type}
      height={data.options.chart.height}
    />
  );
}

export default ReportCharts;

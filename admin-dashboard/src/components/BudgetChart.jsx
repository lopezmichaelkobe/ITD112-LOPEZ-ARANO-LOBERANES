// Histogram.jsx
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Histogram = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [{
      name: 'Prevalence',
      data: [],
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'cars'));
      const countries = [];
      const prevalence = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        countries.push(data.country);
        prevalence.push(data.prevalence);
      });

      setChartData({
        categories: countries,
        series: [{
          name: 'Prevalence',
          data: prevalence,
        }],
      });
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        rotate: -45,
      },
    },
    title: {
      text: 'Prevalence by Country',
      align: 'center',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
    },
    yaxis: {
      title: {
        text: 'Prevalence (%)',
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} %`;
        },
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={chartData.series} type="bar" height={400} />
    </div>
  );
};

export default Histogram;

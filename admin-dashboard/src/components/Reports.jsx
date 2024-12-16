import React, { useState } from 'react';
import ReportCharts from './ReportCharts';

function Reports() {
  return (
    <div className='card'>
        <div className='card-body'>
            <h5 className='card-title'>
              Comparison of Total Country Counts Across Continents
            </h5>
            <p className="card-text" style={{ textIndent: "50px" }}>
              This line graph provides a visual comparison of the total number of countries across different continents. It shows the varying number of countries in each continent over time, allowing us to analyze trends, growth, or changes in geopolitical boundaries. By examining the graph, users can identify regions with higher or lower country counts and gain insights into the historical or current political landscape.
            </p>
            <p className="card-text" style={{ textIndent: "50px" }}>
              The graph emphasizes the differences between continents, helping to showcase how certain continents, such as Africa or Europe, may have seen significant changes in the number of countries due to various factors like independence movements, border changes, or political reorganization. This type of visual analysis aids in understanding the distribution of countries worldwide and their evolution across different time periods. 
            </p>
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px" }}>Hover the mouse to each point to find out how many countries are there in each continent.</p>
            <ReportCharts/>
        </div>
    </div>
  );
}

export default Reports;

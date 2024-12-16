import React, {useState} from 'react';
import CardFilter from './CardFilter';
import BudgetChart from './BudgetChart';

function BudgetReport() {
  return (
    <div className="card">
        <div className='card-body pb-0'>
            <h5 className='card-title'>
                Prevalence of Undernourishment Histogram
            </h5>
            <p className="card-text" style={{ textIndent: "50px" }}>
              The Prevalence of Undernourishment Histogram shows the undernourishment rates across countries. Each bar represents a country, with the height indicating the percentage of the population affected by undernourishment.
            </p>
            <p className="card-text" style={{ textIndent: "50px" }}>
              The percentages reflect the proportion of the population undernourished: <br /><br />
              <ul style={{ listStylePosition: 'inside', paddingLeft: '20px' }}>
                <li style={{ textIndent: '30px' }}><strong>High Percentage</strong>: Indicates a larger portion of the population is undernourished, highlighting food insecurity issues.</li>
                <li style={{ textIndent: '30px' }}><strong>Low Percentage</strong>: Shows fewer people affected by undernourishment, suggesting better access to food and nutrition.</li>
              </ul>
            </p>
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px" }}>
              Hover over each bar to see more details about a country's undernourishment rate and compare countries easily.
            </p>
            <BudgetChart/>
        </div>
    </div>
  );
}

export default BudgetReport;

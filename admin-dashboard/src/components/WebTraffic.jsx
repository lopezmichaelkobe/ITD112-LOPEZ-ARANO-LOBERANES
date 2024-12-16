import React, { useState } from "react";
import CardFilter from './CardFilter';
import WebTrafficChart from "./WebTrafficChart";

function WebTraffic(){

    return (
        <div className="card">
            <div className="card-body pb-0">
                <h5 className="card-title">
                Total Prevalence of Undernourishment (in %) in World Countries
                </h5>
                <p className="card-text" style={{ textIndent: "50px" }}>
                    The Total Prevalence of Undernourishment represents the percentage of the population in each country that faces insufficient food intake to maintain a healthy and active life. This statistic provides a measure of global food insecurity and helps identify regions where undernutrition is a significant concern. Factors such as poverty, climate change, conflict, and limited access to nutritious food contribute to this issue, highlighting the need for targeted interventions to improve food security and nutrition on a global scale.
                </p>
                <p className="card-text" style={{ textIndent: "50px" }}>
                    Click "Hide All" to hide all countries if you want to select only a certain amount of countries, or click "Show All" if you want to see all of the recorded countries in this graph.
                </p>
                <WebTrafficChart/>
                <br /> <br />
                <p className="card-text" style={{ textIndent: "50px" }}>
                   The cluster of legends aka country boxes above, displays each recorded country's names along with the corresponding percentage of undernourishment in the population. This visual representation allows for easy comparison of undernourishment levels across different nations, helping to identify areas of concern. The colors or shading on the map represent varying degrees of prevalence, providing a clear overview of which countries are most affected by food insecurity and malnutrition.
                </p>
                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px" }}>
                   When all of the countries are hidden, click on the country boxes to select only a certain amount of countries to be displayed.
                </p>
            </div>
        </div>
    );
}

export default WebTraffic;
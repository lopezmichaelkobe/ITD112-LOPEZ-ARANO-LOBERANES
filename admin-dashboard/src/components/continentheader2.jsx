import React, { useState } from "react";
import CardFilter from './CardFilter';
import ContinentPrevalence from "./count_countries";

function WebTraffic1(){
    return (
        <div className="card">
            <div className="card-body pb-0">
                <h5 className="card-title">
                Total Countries in Each Continent (in %) 
                </h5>
                <p className="card-text" style={{ textIndent: "50px" }}>
                    This chart displays the malnutrition prevalence percentage distribution of countries across different continents. It provides a quick overview of how countries are grouped geographically on a global scale.
                </p>
                <p className="card-text" style={{ textIndent: "50px" }}>
                    To navigate, simply view the chart to see each continent's share of the total number of countries. Hover over any segment to see detailed information, including the exact percentage and the continent's name.
                </p>
                <ContinentPrevalence/>
            </div>
        </div>
    );
}

export default WebTraffic1;

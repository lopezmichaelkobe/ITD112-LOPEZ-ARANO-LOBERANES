import React from "react";
import ContinentPrevalence from "./continent_prevalence";

function WebTraffic1() {
  return (
    <div className="card">
      <div className="card-body pb-0">
        <h5 className="card-title">
          Total Prevalences in Each Continent (in %) in World Countries
        </h5>
        <p className="card-text" style={{ textIndent: "50px" }}>
          This visualization highlights the percentage of total prevalence for each continent across various world countries. It provides a comprehensive breakdown of prevalence rates, helping users identify regional patterns and trends. By examining this data, stakeholders can make informed decisions and prioritize areas that require further attention or intervention.
        </p>
        <ContinentPrevalence />
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px" }}>
          The legend above displays the names of the continents. It allows you to filter out continents by clicking on their names. This interactive feature helps you focus on specific regions and observe their prevalence data more closely. You can click on any continent in the selection of boxes below the graph to toggle its visibility, making it easier to compare and analyze the data based on your needs. Hover the mouse inside the pie graph to determine a certain country's prevalence rate.
        </p>
      </div>
    </div>
  );
}

export default WebTraffic1;

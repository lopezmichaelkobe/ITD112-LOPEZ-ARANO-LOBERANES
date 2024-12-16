import React from 'react';
import DonutChart from './WebTraffic';
import PieChart from './continentheader';
import PieChart2 from './continentheader';
import SideBars from './SideBars';
import Header from './Header';
import Main from './Main';
import Choropleth from './choropleth';

function  ChoroplethMapPage() {
  return (
    <div className = "col-40">
        <Header/>
        <SideBars/>
        <main id ='main' className='main'>
        <Choropleth/>
        </main>

    </div>
  )
}

export default ChoroplethMapPage
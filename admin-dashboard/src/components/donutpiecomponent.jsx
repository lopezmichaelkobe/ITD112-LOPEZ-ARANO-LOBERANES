import React from 'react';
import DonutChart from './WebTraffic';
import PieChart from './continentheader';
import PieChart2 from './continentheader2';
import SideBars from './SideBars';
import Header from './Header';
import Main from './Main';

function donutpiecomponent() {
  return (
    <div className = "col-40">
        <Header/>
        <SideBars/>
        <main id ='main' className='main'>
            <DonutChart/>
            <PieChart/>
            <PieChart2/>
        </main>

    </div>
  )
}

export default donutpiecomponent
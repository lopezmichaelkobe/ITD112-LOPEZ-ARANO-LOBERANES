import React, {useState} from 'react';
import CardFilter from './CardFilter';
import BudgetChart from './BudgetChart';
import Choropleth from './choropleth';

function BudgetReport() {
  return (
    <div className="card">
        <div className='card-body pb-0'>
        <h5 className='card-title'>
                Choropleth Map
            </h5>
            <Choropleth/>
        </div>
    </div>
  );
}

export default BudgetReport;

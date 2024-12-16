import React, {useState, useEffect}from 'react'
import Card from './Card';
import Reports from './Reports';
import RecentSales from './RecentSales';
import './dashboard.css';
import RecentActivity from './RecentActivity';
import BudgetReport from './BudgetReport';
import WebTraffic from './WebTraffic';
import ChoroplethMap from './ChoroplethFrame';
import Banner from './banner';
import Carousel from './Carousel';
import Continentheader from "./continentheader";
import Continentheader2 from "./continentheader2";
import slides from "../data/carouselData.json";
import VideoMeta from "./videoplayer";
function Dashboard() {

  const [cars, setCards] = useState([])
  const [users, setUsers] = useState([])
  const [admins, setAdmins] = useState([])

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-12">
            <div className="row">
            <Banner/>
            <Carousel data={slides.slides} />
            <VideoMeta/>
             <Card cars={cars} users ={users} admins={admins}/>
             <div className='col-12'>
              <Reports/>

             </div>
             <div className='col-40'>
                <WebTraffic/>
                <Continentheader/>
                <Continentheader2/>
                <ChoroplethMap/>
                <BudgetReport/>
             </div>
            </div>
            </div>
            <div className="col-lg-4">
            </div>
        </div>
    </section>
  );
}

export default Dashboard 
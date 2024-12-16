import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./components/appmain";
import Sample from "./components/sample";
import ManageUsersMain from "./components/ManageUsersMain";
import ManageAdminsMain from "./components/ManageAdminsMain";

import CarLists from "./components/carLists";
import UpdateCar from "./components/updateCar"; 
import DeleteCar from "./components/deleteCar";
import UpdateCarMain from './components/breadcrumbs/update-car-main';
import CreateCarMenu from './components/breadcrumbs/create-car-main';
import UpdateAdminMain from './components/breadcrumbs/update-admin-main';
import UpdateUserMain from './components/breadcrumbs/update-user-main';


import ShowBorrowCarList from './components/show-borrowedcar-list-main';
import UpdateBorrowCar from './components/update-borrowcar-main';
import UpdateBorrowCarForm from './components/breadcrumbs/update-borrowcar-main1';
import DeleteBorrowCarsMain from './components/DeleteBorrowCarsMain';
import Map from './components/choropleth';
import Banner from './components/banner';
import DonutPiePage from './components/donutpiecomponent'; 
import LineChartPage from './components/LineGraphPage'; 
import HistogramPage from './components/histogrampage'; 


import Test from'./components/test';
import ChoroplethMapPage from "./components/ChoroplethMapPage";
import VideoMeta from "./components/videoplayer";


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sample" element={<Sample />} />
          <Route path="/manage-users"element={<ManageUsersMain/>}/>
          <Route path="/manage-admins"element={<ManageAdminsMain/>}/>
          <Route path="/car-lists"element={<CarLists/>}/>
          <Route path="/edit-car"element={<UpdateCar/>}/>
          <Route path="/delete-car"element={<DeleteCar/>}/>
          <Route path = '/edit/:id' element={<UpdateCarMain />}></Route>
          <Route path = '/editadmin/:id' element={<UpdateAdminMain />}></Route>
          <Route path = 'car-lists/create-car-main' element={<CreateCarMenu />}></Route>
          <Route path = '/edituser/:id' element={<UpdateUserMain />}></Route>
          <Route path = '/borrowcar-list' element={<ShowBorrowCarList />}></Route>
          <Route path = '/update-borrowcar' element={<UpdateBorrowCar />}></Route>
          <Route path = '/edit-borrowcar/:id' element={<UpdateBorrowCarForm />}></Route>
          <Route path = '/delete-borrowcar' element={<DeleteBorrowCarsMain />}></Route>
          <Route path = '/map' element={<Map />}></Route>
          <Route path = '/banner' element={<Banner />}></Route>
          <Route path = '/donutpiepage' element={<DonutPiePage />}></Route>
          <Route path = '/linechartpage' element={<LineChartPage />}></Route>
          <Route path = '/choroplethmappage' element={<ChoroplethMapPage />}></Route>
          <Route path = '/histogrampage' element={<HistogramPage />}></Route>
          <Route path = '/videosdg' element={<VideoMeta />}></Route>

          {/*Texting Area */}
          <Route path = '/test' element={<Test />}></Route>


          


 
          
        </Routes>
        {/* <ImageUpload/> */}
      </div>
    </Router>
  );
}

export default App;

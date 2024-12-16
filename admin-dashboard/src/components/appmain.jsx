import React, { Component, useEffect, useState } from "react";

//import Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import bootstrap 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './appmain.css';
import Header from "./Header";
import SideBar from "./SideBars";
import Main from "./Main";

export default function appmain() {
  return (
    <>
      <Header/>
      <SideBar/>
      <Main />

    </>
  );
}




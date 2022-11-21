import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";

import "./App.css";
import RomcomQuiz from "./components/quizRomCom"
import MapSection from "./components/map"
import AddEvent from "./components/nonprofitPortal";
//import Login from "./components/Login";


const location = {
    address: '600 Dr. M.L.K. Jr Blvd, Nashville, TN 37243',
    lat: 36.1662594015328,
    lng: -86.78406041733878,
}

const App = () => {
 return (
   <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/nonprofitPortal" element={<AddEvent />}/>
      <Route path="/quizRomCom" element={<RomcomQuiz />}/>
     </Routes>
     <MapSection location = {location} zoomLevel={15} />
   </div>
 );
};
 
export default App;

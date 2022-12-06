import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";

import "./App.css";
import RomcomQuiz from "./components/quizRomCom"
import MapSection from "./components/map"
import CreateEvent from "./components/nonprofitPortal";
import AddUser from "./components/createUser";
import ViewEvents from "./components/volunteerPortal";
import SignUp from "./components/signup"
import AddNonprofit from "./components/createNonprofit";
import NonprofitErrorCredentials from "./components/error_credentials";
import ViewOrganizations from "./components/organizationPortal";
import CreateOrganization from "./components/createOrg";
import ManageEvent from "./components/manageEvent";
//import Login from "./components/Login";


const location = {
    address: '600 Dr. M.L.K. Jr Blvd, Nashville, TN 37243',
    lat: 36.1662594015328,
    lng: -86.78406041733878,
}
const center = {
    lat: 36.1662594015328,
    lng: -86.78406041733878,
}

const App = () => {
 return (
   <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/nonprofitPortal" element={<CreateEvent />}/>
      <Route path="/volunteerPortal" element={<ViewEvents />}/>
      <Route path="/userSignup" element={<AddUser />}/>
      <Route path="/nonprofitSignup" element={<AddNonprofit />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/viewmap" element={<ViewEvents />}/>
      <Route path="/crdntl_err" element={<NonprofitErrorCredentials />}/>
      <Route path="/organizations" element={<ViewOrganizations />}/>
      <Route path="/createorg" element={<CreateOrganization />}/>
      <Route path="/manageEvent" element={<ManageEvent />}/>

     </Routes>
   </div>
 );
};
 
export default App;

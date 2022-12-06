import './nonprofit.css'
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
 
export default function NonProfitPortal() {
 const navigate = useNavigate();

 return(
     <div>
         <h1>
             Nonprofit Options
         </h1>
            
        <h5> Register an event and start recruiting volunteers here! </h5>
     
         <Link to={`/nonprofitPortal`}>
                    <Button variant = "primary"> Click Here to Register an Event</Button>
         </Link>
         <h1>  </h1>
         <h5> View a list of the volunteers signed up on your last event and confirm their attendance. </h5>

         <Link to={`/manageEvent`}>
                    <Button variant = "primary"> Click Here to Confirm Attendance for a Past Event</Button>
         </Link>

     </div>    
 )

}
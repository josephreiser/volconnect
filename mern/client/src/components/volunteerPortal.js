import './volunteer.css'
import React, { useState } from "react";
import { renderMatches, useNavigate } from "react-router";
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';

export default function ViewEvents() {
    
    
    const [posts, setPosts] = useState([])
    const [displayed, setDisplayed] = useState(false)


    if (displayed == false){ 
        axios.get('http://localhost:5000/events/view')
        .then((response) => {
            setPosts(response.data)
        })
        .catch(() => {
            alert('Error retrieving data')
        });
        setDisplayed(true)
    }    
    
    return(
        <div>
            <ul>
                {
                    posts.map((data) => (
                        <li key={data._id}> 
                        <p> Name: {data.name}</p>
                        <p> Address: {data.address}</p>
                        <p> Date: {data.date}</p>
                        <p> Starts at: {data.startTime}</p>
                        <p> Ends at: {data.endTime}</p>
                        <p> Description: {data.desc}</p>
                        <Link to={`/`}>
                             <Button variant="primary">Sign Up</Button>
                        </Link>
                        <Link to={`/`}>
                             <Button variant="primary">View on Map</Button>
                        </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
    
    
}
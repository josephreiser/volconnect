import './volunteer.css'
import React, { useState } from "react";
import { renderMatches, useNavigate } from "react-router";
import axios from 'axios'

export default function ViewEvents() {
    
    
    console.log('test')
    const [posts, setPosts] = useState([])
    const [displayed, setDisplayed] = useState(false)

    console.log('test2')

    if (displayed == false){ 

        axios.get('http://localhost:5000/events/view')
        .then((response) => {
            const data = response.data
            console.log(data)
            setPosts(data)
            console.log('test ', posts)

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

                        </li>
                    ))
                }
            </ul>
        </div>
    );
    
    
}
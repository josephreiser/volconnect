import './volunteer.css'
import React, { useState } from "react";
import { renderMatches, useNavigate } from "react-router";
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';
import MapSection from "./components/map"

export default function ViewEvents() {
    function reload() {
        console.log('why')
        window.location.reload(false)
    }
    const [form, setForm] = useState({
        email: "",
        password: ""
     });
    const [posts, setPosts] = useState([])
    const [displayed, setDisplayed] = useState(false)
    const [selectedEvent, selectEvent] = useState({})
    const [selectedButtonType, selectButtonType] = useState("")
    const [chosen, setChosen] = useState(false)
    const [coords, setCoords] = useState([])

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }
    async function onSubmit(e) {
        e.preventDefault();
      
        // When a post request is sent to the create url, we'll add a new record to the database.
        const attendee = { ...form };
        console.log(attendee)
    }

    if (displayed == false){ 
        axios.get('http://localhost:5000/events/view')
        .then((response) => {
            console.log(response)
            setPosts(response.data)
        })
        .catch(() => {
            alert('Error retrieving data')
        });
        setDisplayed(true)
    }

    if (chosen == false){
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
                            <button onClick={function(){setChosen(true); selectEvent(data); selectButtonType("signup")}}>
                            Sign Up
                            </button>
                            <button onClick={function(){setChosen(true); selectEvent(data); selectButtonType("viewmap")}}>
                            View on Map
                            </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
    else if (selectedButtonType == 'signup') {
        return (
            <div className="wrapper">
                <h1>Register for this Event</h1>
                <h4> Event Details</h4>
                  <p> Name: {selectedEvent.name} </p>
                  <p> Location: {selectedEvent.address} </p>
                  <p> Date: {selectedEvent.date} </p>
                  <p> From {selectedEvent.startTime} to {selectedEvent.endTime} </p>
                  <p> Description: {selectedEvent.desc}</p>
                <form onSubmit={onSubmit} >
                    <fieldset>
                        <label>
                            <p>Enter your Email</p>
                            <input 
                             name = "event-name" 
                             value = {form.email}
                             onChange = {(e) => updateForm({email: e.target.value})}
                             required
                             />
                        </label>
    
                        <label id="date">
                            <p>Enter your password</p>
                            <input 
                             name = "password"
                             value = {form.password}
                             onChange = {(e) => updateForm({password: e.target.value})}
                             required
                             />
                        </label>
                    </fieldset>
                    <button onClick = {function() {reload()}}>
                     Go Back 
                    </button>
                    <button type="submit" id="submit">Sign Up</button>
                </form>
            </div>
        );
    }
    else if (selectedButtonType == 'viewmap'){

        let address
        address = selectedEvent.address.toString()
        let city = selectedEvent.city.toString()
        let state = selectedEvent.state.toString()
        let prelimAddress = address + ',' + city + ',' + state
        let requestAddress= prelimAddress.replace("\s", "+")
        let fullAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=" + requestAddress + "&key=AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8"

        axios.get(fullAddress)
            .then((response) => {
                console.log(response)
                setCoords(response.data)
            })
            .catch(() => {
                alert('Error retrieving data')
            });

        let results = coords["results"]


        const location = {
            address: '600 Dr. M.L.K. Jr Blvd, Nashville, TN 37243',
            lat: null,
            lng: null,
        }
    }
}
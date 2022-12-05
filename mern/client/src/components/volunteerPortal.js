import './volunteer.css'
import React, { useState } from "react";
import { renderMatches, useNavigate } from "react-router";
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';
import MapSection from "./map"


export default function ViewEvents() {
    const navigate = useNavigate();

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
    const [geoData, setGeoData] = useState([])
    const [foundCoords, setChordsFound] = useState(false)

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }
    async function getCoordinates(e){
        const prelimAddress = selectedEvent.address + ',' + selectedEvent.city + ',' + selectedEvent.state
        const requestAddress = prelimAddress.replaceAll(" ", "+")
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: requestAddress,
                key: 'AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8'
            }
        })
        .then((response) => {
            setCoords(response.data.results[0].geometry.location)
            setGeoData(response.data.results[0])
            setChordsFound()
            console.log(coords)
        })
        .catch(() => {
            alert('Error retrieving data')
        });
    }
    async function onSubmit(e) {
        e.preventDefault();
        console.log('test1')
        // When a post request is sent to the create url, we'll add a new record to the database.
        const attendee = { ...form };
        console.log(attendee)
        axios.post('http://localhost:5000/users/verify', JSON.stringify(attendee),
        {
            headers: {
                'content-type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        })
        .then((response) => {
            if (response.data.password == attendee.password){

                let comparator = {
                    eventid: selectedEvent._id,
                    userid: response.data._id,
                    userFirst: response.data.firstName,
                    userLast: response.data.lastName,
                }
                axios.post('http://localhost:5000/events/update', JSON.stringify(comparator),
                {
                    headers: {
                        'content-type': "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    } 
                }).catch(() => {
                    alert('Error retrieving data')
                });
            }
        })
        .catch(() => {
            alert('Error retrieving data')
        });
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
                <div>
                    <h1> 
                        Here is a list of volunteering events in your area.
                    </h1>
                    
                </div>
                <div>
                    <ul>
                        {
                            posts.map((data) => (
                                <li key={data._id}> 
                                <h3> {data.name}</h3>
                                <p> {data.address}, {data.city}, {data.state} {data.zip}</p>
                                <p> {data.date}</p>
                                <p> Starts at: {data.startTime} CT</p>
                                <p> Ends at: {data.endTime} CT</p>
                                <p> Description: {data.desc}</p>
                                <button id = "signup" onClick={function(){setChosen(true); selectEvent(data); selectButtonType("signup")}}>
                                Sign Up
                                </button>
                                <button id = "mapButton" onClick={function(){setChosen(true); selectEvent(data); selectButtonType("viewmap")}}>
                                View on Map
                                </button>
                                    <hr/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
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
                  <p> City: {selectedEvent.city} </p>
                  <p> State: {selectedEvent.state} </p>
                  <p> Date: {selectedEvent.date} </p>
                  <p> From {selectedEvent.startTime} to {selectedEvent.endTime} </p>
                  <p> Description: {selectedEvent.desc}</p>
                  <p> Attendees: {selectedEvent.attendeeList.map((tag, i) => <span key={i}>
                {i > 0 && ", "} {tag} </span>)}
                 </p>
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
        if (foundCoords == false){     
            console.log('hello')   
            getCoordinates()
        }
        let location = {
            address: geoData.formatted_address,
            lat: coords.lat,
            lng: coords.lng,
        }

        let center = {
            lat: coords.lat,
            lng: coords.lng,
        }

        //tests
        console.log(location)
        console.log(center)

        return(
            <MapSection location = {location} zoomLevel={14} center={center} />
        )

    }
    
    
}
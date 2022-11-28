import './nonprofit.css'
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
 
export default function CreateEvent() {
 const [form, setForm] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    desc: ""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newEvent = { ...form };
   console.log(newEvent)

   axios.post('http://localhost:5000/events/create', JSON.stringify(newEvent), 
   { 
       headers: {
            'content-type': "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
    });
    
    /*axios.post('http://129.114.25.216:30001/events/create', JSON.stringify(newEvent), 
   { 
       headers: {
            'content-type': "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
   /
   await fetch("http://localhost:5000/events/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newEvent),
   })
   .catch(error => {
     window.alert(error);
     return;
   }); */
 
   setForm({ name: "", date: "", startTime: "", endTime: "", address: "",
            city: "", state: "", zip: "", desc: ""});
   navigate("/");
 }

    return (
        <div className="wrapper">
            <h1>Enter New Volunteering Event</h1>
            <form onSubmit={onSubmit} >
                <fieldset>
                    <label>
                        <p>Event Name</p>
                        <input 
                         name = "event-name" 
                         value = {form.name}
                         onChange = {(e) => updateForm({name: e.target.value})}
                         />
                    </label>

                    <label id="date">
                        <p>Date</p>
                        <input 
                         type="date" 
                         id="date" 
                         aria-describedby="date-format" 
                         min="2022-08-01" 
                         max="2024-01-01" 
                         value = {form.date}
                         onChange = {(e) => updateForm({date: e.target.value})}
                         />
                    </label>

                    <label>
                        <p>Start Time</p>
                        <input 
                         type="time" 
                         id="appt" 
                         name="appt"
                         min="00:00" 
                         max="23:59"
                         value = {form.startTime}
                         onChange = {(e) => updateForm({startTime: e.target.value})}
                         required />
                    </label>

                    <label>
                        <p>End Time</p>
                        <input 
                         type="time" 
                         id="appt" 
                         name="appt"
                         min="00:00" 
                         max="23:59"
                         value = {form.endTime.toString()}
                         onChange = {(e) => updateForm({endTime: e.target.value})}
                         required />
                    </label>

                    <label>
                        <p>Address</p>
                        <input 
                        name="address" 
                        value = {form.address}
                        onChange = {(e) => updateForm({address: e.target.value})}
                        />
                    </label>

                    <label>
                        <p>City</p>
                        <input 
                        name="City" 
                        value = {form.city}
                        onChange = {(e) => updateForm({city: e.target.value})}
                        />
                    </label>

                    <label>
                        <p>State</p>
                        <input 
                        name="State" 
                        value = {form.state}
                        onChange = {(e) => updateForm({state: e.target.value})}
                        />
                    </label>

                    <label id="zip-label">
                        <p>Zip</p>
                        <input 
                         name="zip"
                         value = {form.zip}
                         onChange = {(e) => updateForm({zip: e.target.value})}
                         />
                    </label>

                    <label id = "description-label">
                        <p>Description</p>
                        <textarea 
                         name = "description" 
                        id="description" 
                        value = {form.desc}
                        onChange = {(e) => updateForm({desc: e.target.value})}
                        />
                    </label>

                </fieldset>

                <button type="submit" id="submit">Submit</button>
            </form>
        </div>
    );
}
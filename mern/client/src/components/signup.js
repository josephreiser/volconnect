import './nonprofit.css'
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
 
export default function SignUp({event}) {
 const [form, setForm] = useState({
    email: "",
    password: ""
 });
 const navigate = useNavigate();

 console.log({event})
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
   const attendee = { ...form };
   console.log(attendee)
    /*
   axios.get('http://localhost:5000/users/verify', JSON.stringify(attendee), 
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
   axios.post('http://localhost:5000/events/signup', JSON.stringify(attendee), 
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
    }); */
    
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
 
   setForm({ email: "", password: ""});
   navigate("/");
   alert("Successfully signed up for this event")
 }

    return (
        
        <div className="wrapper">
            <h1>Register for this Event</h1>
            <form onSubmit={onSubmit} >
                <fieldset>
                    <label>
                        <p>Enter the Email that you Registered with</p>
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

                <button type="submit" id="submit">Sign Up</button>
            </form>
        </div>
    );
}
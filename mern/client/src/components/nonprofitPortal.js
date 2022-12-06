import './nonprofit.css'
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
 
export default function CreateEvent() {
 const navigate = useNavigate();

 const [form, setForm] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    desc: "",
    email: "",
    password: ""
 });

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
   const nonprofit = {
       email: newEvent.email,
       password: newEvent.password
   }

   axios.post('http://129.114.25.172:30001/nonprofits/verify', JSON.stringify(nonprofit),
        {
            headers: {
                'content-type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        })
        .then((response) => {
            if (response.data.password == nonprofit.password){
                newEvent.creator = response.data._id
                axios.post('http://129.114.25.172:30001/events/create', JSON.stringify(newEvent), 
                { 
                    headers: {
                            'content-type': "application/json",
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                        }
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                
                })
            }
            else{
                navigate('/crdntl_err')
            }
        })

    
 
        setForm({ name: "", date: "", startTime: "", endTime: "", address: "",
                    city: "", state: "", zip: "", desc: "", email: "", password: ""});
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
                         required
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
                         required
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
                        required
                        />
                    </label>

                    <label>
                        <p>City</p>
                        <input 
                        name="City" 
                        value = {form.city}
                        onChange = {(e) => updateForm({city: e.target.value})}
                        required
                        />
                    </label>

                    <label>
                        <p>State</p>
                        <input 
                        name="State" 
                        value = {form.state}
                        onChange = {(e) => updateForm({state: e.target.value})}
                        required
                        />
                    </label>

                    <label id="zip-label">
                        <p>Zip</p>
                        <input 
                         name="zip"
                         value = {form.zip}
                         onChange = {(e) => updateForm({zip: e.target.value})}
                         required
                         />
                    </label>

                    <label>
                        <p>Nonprofit Email</p>
                        <input 
                        name="address" 
                        value = {form.email}
                        onChange = {(e) => updateForm({email: e.target.value})}
                        required
                        />
                    </label>
                    <label>
                        <p>Nonprofit Password</p>
                        <input 
                        name="address" 
                        value = {form.password}
                        onChange = {(e) => updateForm({password: e.target.value})}
                        required
                        />
                    </label>

                    <label id = "description-label">
                        <p>Description</p>
                        <textarea 
                         name = "description" 
                        id="description" 
                        value = {form.desc}
                        onChange = {(e) => updateForm({desc: e.target.value})}
                        required
                        />
                    </label>

                  

                    

                </fieldset>

                <button type="submit" id="submit">Submit</button>
            </form>
        </div>
    );
}
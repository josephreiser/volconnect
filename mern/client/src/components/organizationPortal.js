import './volunteer.css'
import React, { useState } from "react";
import { renderMatches, useNavigate } from "react-router";
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';
import MapSection from "./map"
import { Card } from 'react-bootstrap';


export default function ViewOrganizations() {
    const navigate = useNavigate();
    function reload() {
        window.location.reload(false)
    }

    const [form, setForm] = useState({
        email: "",
        password: ""
     });

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    const [chosen, setChosen] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [selectedButtonType, selectButtonType] = useState("")
    const [selectedOrg, selectOrg] = useState("")
    const [displayed, setDisplayed] = useState(false)
    const [members, setMembers] = useState([])
    const [leaderboardGenerated, setLeaderboardGenerated] = useState(false)


    async function onSubmit(e) {
        e.preventDefault();
      
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newMember = { ...form, organizationID: selectedOrg._id };

     
        axios.post('http://129.114.25.172:30001/users/verify', JSON.stringify(newMember),
             {
                 headers: {
                     'content-type': "application/json",
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                 }
             })
             .then((response) => {
                 if (response.data.password == newMember.password){
                     newMember._id = response.data._id
                     axios.post('http://129.114.25.172:30001/orgs/newmember', JSON.stringify(newMember), 
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

    if (displayed == false){
        axios.get('http://129.114.25.172:30001/orgs')
        .then((response) => {
            console.log(response)
            setOrgs(response.data)
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
                        Here is a list of volunteer organizations connected with VolunteerConnect
                    </h1>
                    <br/>
                </div>
                <button variant="primary" onClick={function(){navigate("/createorg")}}>
                    Create an Organization
                </button>
                <div>
                    <ul>
                        {
                            orgs.map((data) => (
                                <li key={data._id}> 
                                <h3> Organization: {data.name}</h3>
                                <p> Description: {data.desc}</p>
                                <button id = "signup" onClick={function(){setChosen(true); selectOrg(data); selectButtonType("signup")}}>
                                Register for this Organization
                                </button>
                                <button id = "viewleaderboard" onClick={function(){setChosen(true); selectOrg(data); selectButtonType("viewleaderboard")}}>
                                View Organization Leaderboard
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
                <h1>Register for this Organization</h1>
                  <p> Organization: {selectedOrg.name} </p>
                  <p> Description: {selectedOrg.desc} </p>
                  <p> Number of Members: {selectedOrg.members.length}
                 </p>
                <form onSubmit={onSubmit} >
                    <fieldset>
                        <label>
                            <p>Enter your Email</p>
                            <input 
                             name = "email" 
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
                    <button id = "goBack" onClick = {function() {reload()}}>
                     Go Back 
                    </button>
                    <button type="submit" id="submit">Sign Up</button>
                </form>
            </div>
        );
    }
    else if (selectedButtonType == 'viewleaderboard') {
        if (leaderboardGenerated == false){
            const myRequest = {
                attendees: selectedOrg.members
            }
            axios.post('http://129.114.25.172:30001/users/group', JSON.stringify(myRequest),
            {
                headers: {
                    'content-type': "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })
            .then((response) => {
                setMembers(response.data)
            })
            .catch(() => {console.log('what??')})
            setLeaderboardGenerated(true)
        }
        else{
            console.log(members)
            return(
                <div>
                    <h1> Organization: {selectedOrg.name} </h1>
                    <h3> Size: {selectedOrg.members.length} people </h3>
                    <h3> Description: {selectedOrg.desc} </h3>
                    <h3> Current Rankings (by number of events attended): </h3>
                    <ul>
                        {
                            members.map((data) => (
                                <li key={data._id}> 
                                <h3> Name: {data.firstName} {data.lastName}</h3>
                                <p> Events attended: {data.eventsAttended.length} </p>
                                </li>

                            ))
                        }
                    </ul>
                </div>
            )
        }
           
    }

    
    
}
// Authors: Lauren Young (50%), Kavi Palmer (50%)

import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
 
export default function CreateOrganization() {

 const [form, setForm] = useState({
   name: "",
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
   const newOrg = { ...form };
 
   axios.post('http://129.114.25.172:30001/orgs/add', JSON.stringify(newOrg), 
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
 
   setForm({name: "", desc: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create a Volunteering Organization</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name of your Organization</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Give us a short description of your organization</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.desc}
           onChange={(e) => updateForm({ desc: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Register your organization"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
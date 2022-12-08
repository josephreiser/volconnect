// Authors: Joe Reiser (50%), Kavi Palmer (50%)

import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
 
export default function AddUser() {
 const [form, setForm] = useState({
   firstName: "",
   lastName: "",
   email: "",
   status: "",
   organization: "",
   password: ""
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
   const newPerson = { ...form };
 
   axios.post('http://129.114.25.172:30001/users/add', JSON.stringify(newPerson), 
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
    
     
 
   setForm({firstName: "", lastName: "", email: "", status: "", organization: "", password: ""});
   navigate("/");
   alert("Account Created! Navigate to the Volunteers tab to sign up for events.")
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create an Account</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">First Name</label>
         <input
           type="text"
           className="form-control"
           id="firstName"
           value={form.firstName}
           onChange={(e) => updateForm({ firstName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Last Name</label>
         <input
           type="text"
           className="form-control"
           id="lastName"
           value={form.lastName}
           onChange={(e) => updateForm({ lastName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Reason for Signup</label>
         <input
           type="text"
           className="form-control"
           id="status"
           value={form.status}
           onChange={(e) => updateForm({ status: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="volunteer"
             value="volunteer"
             checked={form.status === "volunteer"}
             onChange={(e) => updateForm({ status: e.target.value })}
           />
           <label htmlFor="volunteer" className="form-check-label">Volunteer</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="comservice"
             value="comservice"
             checked={form.status === "comservice"}
             onChange={(e) => updateForm({ status: e.target.value })}
           />
           <label htmlFor="comservice" className="form-check-label">Court-Mandated Community Service</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create an Account"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
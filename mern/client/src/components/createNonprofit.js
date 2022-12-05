import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
 
export default function AddNonprofit() {
 const [form, setForm] = useState({
   name: "",
   address: "",
   email: "",
   description: "",
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
 
   axios.post('http://localhost:5000/users/add', JSON.stringify(newPerson), 
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
 
   setForm({name: "", address: "", email: "", description: "", password: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create an Account</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Official Name of your Organization</label>
         <input
           type="text"
           className="form-control"
           id="firstName"
           value={form.firstName}
           onChange={(e) => updateForm({ firstName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Official Mailing Address of your Organization</label>
         <input
           type="text"
           className="form-control"
           id="lastName"
           value={form.lastName}
           onChange={(e) => updateForm({ lastName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Relevant Email for your Organization (used for login and communication)</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Choose a Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">What type of Organization are you?</label>
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
             id="nonprofit"
             value="Nonprofit"
             checked={form.status === "nonprofit"}
             onChange={(e) => updateForm({ status: e.target.value })}
           />
           <label htmlFor="volunteer" className="form-check-label">Nonprofit</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="charity"
             value="Charity"
             checked={form.status === "charity"}
             onChange={(e) => updateForm({ status: e.target.value })}
           />
           <label htmlFor="comservice" className="form-check-label">Charity</label>
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
// Authors: Lauren Young (50%), Kavi Palmer (50%)

import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "react-bootstrap/Button";

 
export default function ManageEvent() {

 const [form, setForm] = useState({
   email: "",
   password: ""
 });
 const [loggedIn, login] = useState(false)
 const navigate = useNavigate();
 const [myEvent, setEvent] = useState(null)
 const [myAttendees, setAttendees] = useState([])
 const [checkedItems, setCheckedItems] = useState([])
 const [isCheckedAll, setIsCheckAll] = useState(false);


 function submitAttendees(){
   const myRequest = {
     event: myEvent._id,
     attendees: myAttendees
   }
   console.log(myRequest)
   axios.post('http://localhost:3000/users/update', JSON.stringify(myRequest),
   {
       headers: {
           'content-type': "application/json",
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
       }
   })
   .then((response) => {
     console.log(response)
   })
   .catch(() => {})
   navigate('/')
 }

 function updateAttendees(value1, value2){
   setEvent(value1)
   setAttendees(value2)
 }

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }


 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   const admin = { ...form };
 
   axios.post('http://localhost:3000/nonprofits/verify', JSON.stringify(admin),
        {
            headers: {
                'content-type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        })
        .then((response) => {
          if (response.data.password == admin.password){
            const body = {
              _id: response.data._id
            }
            axios.post('http://localhost:3000/events/find', JSON.stringify(body), 
            {
              headers: {
                  'content-type': "application/json",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
              }
          })
            .then((response) => {
              setAttendees(response.data.attendeeList)
              setEvent(response.data)
              updateAttendees(response.data,response.data.attendeeList)

            login(true)

            })
            .catch(() => {
                alert('Error retrieving data')
            });
          }
        })
 
   setForm({email: "", password: ""});
 }
 
 // This following section will display the form that takes the input from the user.
 if (loggedIn == false){
  return (
    <div>
      <h3>Enter your Nonprofit's credentials to get started</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Email of your Nonprofit</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
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
 else{
   return(
     <div>
           <ul>

            <li>
              <input
                type="checkbox"
                onChange={function(){
                  setIsCheckAll(!isCheckedAll);
                  setCheckedItems(myAttendees);
                  if (isCheckedAll) {
                    setCheckedItems([]);
                  }
                }}             
                checked={isCheckedAll}             
              />
              <label>Check All</label>
            </li>
            {
            myAttendees.map((data) => (
            <li key={data[1]}>
            <p> Name: {data[0]} </p>
            <input
              type="checkbox"
              data-key={data[1]}               
              onChange={function(){if (checkedItems.includes(data[1])){
                setCheckedItems((prev) => prev.splice(prev.indexOf(data[1])))
              }
              else {
                setCheckedItems((prev) => 
                  [...prev, data[1]]
                )
              }}}           
              checked={checkedItems.includes(data[1])} 
            />
            </li>
            ))
            }
          </ul>
          <Button variant = "primary" onClick = {submitAttendees}>
                     Submit Atteendees
          </Button>

     </div>
   )
 }
}
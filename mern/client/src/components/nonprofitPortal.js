import React from 'react'
import './nonprofit.css'

function handleSubmit (event) {
    event.preventDefault();
    alert('submitted');
}

export default function AddEvent(){
    return (
        <div className="wrapper">
            <h1>Enter New Volunteering Event</h1>
            <form onSubmit={handleSubmit} >
                <fieldset>

                    <label>
                        <p>Event Name</p>
                        <input name = "event-name" />
                    </label>


                    <label for="date">
                        <p>Date</p>
                        <input type="date" id="date" aria-describedby="date-format" min="2022-08-01" max="2024-01-01" />
                    </label>

                    <label>
                        <p>Time</p>
                        <input type="time" id="appt" name="appt"
                               min="00:00" max="12:00" required />
                    </label>

                    <label>
                        <p>Address</p>
                        <input name="address" />
                    </label>

                    <label>
                        <p>City</p>
                        <select name = "city">
                            <option name = "nashville">Nashville</option>
                        </select>
                    </label>

                    <label>
                        <p>State</p>
                        <select name = "state">
                            <option name = "tn">TN</option>
                        </select>
                    </label>

                    <label id="zip-label">
                        <p>Zip</p>
                        <input name="zip" />
                    </label>

                    <label id = "description-label">
                        <p>Description</p>
                        <textarea name = "description" id="description" />
                    </label>

                </fieldset>
                <button type="submit" id="submit">Submit</button>
            </form>
        </div>
    )
}
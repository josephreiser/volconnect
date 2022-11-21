import React from 'react';
import './nonprofit.css'

const addEvent = ({}) => (
    <div className="wrapper">
        <h1>Enter New Volunteering Event</h1>
        <form>
            <fieldset>
                <label>
                    <p>Address</p>
                    <input name="address" />
                </label>
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    </div>
)

export default addEvent
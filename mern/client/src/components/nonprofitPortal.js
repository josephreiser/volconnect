import React from 'react';
import './nonprofit.css'

export default function AddEvent(){
    return (
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
    );
}
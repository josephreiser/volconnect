import './volunteer.css'
import React, {useState} from "react";
import axios from 'axios'


export default function ViewEvents() {
    function reload() {
        console.log('why')
        window.location.reload(false)
    }
    const [form, setForm] = useState({
        email: "",
        password: ""
     });
    const [posts, setPosts] = useState([])
    const [displayed, setDisplayed] = useState(false)
    const [selectedEvent, selectEvent] = useState({})
    const [selectedButtonType, selectButtonType] = useState("")
    const [chosen, setChosen] = useState(false)
    const [coords, setCoords] = useState([])
    //const {} = useJsApiLoader({ googleMapsApiKey: 'AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8'})

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }
    async function onSubmit(e) {
        e.preventDefault();
        console.log('test1')
        // When a post request is sent to the create url, we'll add a new record to the database.
        const attendee = { ...form };
        console.log(attendee)
        axios.post('http://localhost:5000/users/verify', JSON.stringify(attendee),
        {
            headers: {
                'content-type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        })
        .then((response) => {
            if (response.data.password == attendee.password){

                let comparator = {
                    eventid: selectedEvent._id,
                    userid: response.data._id
                }
                console.log(comparator)
                axios.post('http://localhost:5000/events/update', JSON.stringify(comparator),
                {
                    headers: {
                        'content-type': "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    } 
                }).catch(() => {
                    alert('Error retrieving data')
                });
            }
        })
        .catch(() => {
            alert('Error retrieving data')
        });
    }

    if (displayed == false){ 
        axios.get('http://localhost:5000/events/view')
        .then((response) => {
            console.log(response)
            setPosts(response.data)
        })
        .catch(() => {
            alert('Error retrieving data')
        });
        setDisplayed(true)
    }

    if (chosen == false){
        return(
            <div>
                <ul>
                    {
                        posts.map((data) => (
                            <li key={data._id}> 
                            <p> Name: {data.name}</p>
                            <p> Address: {data.address}</p>
                            <p> Date: {data.date}</p>
                            <p> Starts at: {data.startTime}</p>
                            <p> Ends at: {data.endTime}</p>
                            <p> Description: {data.desc}</p>
                            <button onClick={function(){setChosen(true); selectEvent(data); selectButtonType("signup")}}>
                            Sign Up
                            </button>
                            <button onClick={function(){setChosen(true); selectEvent(data); selectButtonType("viewmap")}}>
                            View on Map
                            </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
    else if (selectedButtonType == 'signup') {
        return (
            <div className="wrapper">
                <h1>Register for this Event</h1>
                <h4> Event Details</h4>
                  <p> Name: {selectedEvent.name} </p>
                  <p> Location: {selectedEvent.address} </p>
                  <p> City: {selectedEvent.city} </p>
                  <p> State: {selectedEvent.state} </p>
                  <p> Date: {selectedEvent.date} </p>
                  <p> From {selectedEvent.startTime} to {selectedEvent.endTime} </p>
                  <p> Description: {selectedEvent.desc}</p>
                <form onSubmit={onSubmit} >
                    <fieldset>
                        <label>
                            <p>Enter your Email</p>
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
                    <button onClick = {function() {reload()}}>
                     Go Back 
                    </button>
                    <button type="submit" id="submit">Sign Up</button>
                </form>
            </div>
        );
    }
    else if (selectedButtonType == 'viewmap') {

        let address
        address = selectedEvent.address.toString()
        let city = selectedEvent.city.toString()
        let state = selectedEvent.state.toString()
        let prelimAddress = address + ',' + city + ',' + state
        let requestAddress = prelimAddress.replaceAll(" ", "+")

        function setCoordinates(response) {
            setCoords(response)
        }

        function axiosCall() {
            // create a promise for the axios request
            const promise = axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                            params: {
                                address: requestAddress,
                                key: 'AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8'
                            }
                        })

            // using .then, create a new promise which extracts the data
            // return it
            return promise.then((response) => response.data.results[0]).catch(() => {
                alert('Error retrieving data')
            })
        }

       let data = axiosCall().then(data => {setCoords(data)})
        console.log(data)

        // let location = {
        //     address: data.formatted_address,
        //     lat: data.geometry.location.lat,
        //     lng: data.gemoetry.location.lng,
        // }

        // (async () => {
        //     let data;
        //     function status() {
        //         return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        //             params: {
        //                 address: requestAddress,
        //                 key: 'AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8'
        //             }
        //         }).then((resp) => {
        //             return resp.data.results[0];
        //         })
        //             .catch(() => {
        //                          alert('Error retrieving data')
        //             });
        //     }
        //     data = await status();
        //     let location = {
        //         address: data.formatted_address,
        //         lat: data.geometry.location.lat,
        //         lng: data.gemoetry.location.lng,
        //     }
        //     console.log(data);
        // })();


        // axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        //     params: {
        //         address: requestAddress,
        //         key: 'AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8'
        //     }
        // })
        //     .then((response) => {
        //         console.log(response)
        //
        //         // function setCoordinates(response) {
        //         //     setCoords(response.data.results[0].geometry.location)
        //         // }
        //     })
        //     .catch(() => {
        //         alert('Error retrieving data')
        //     });


        // const {} = useJsApiLoader({ googleMapsApiKey: 'AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8'})

        // const center = {lat: 36.1662594015328,
        //                 lng: -86.78406041733878,}
        //
        // const options = {
        //     zoom:15,
        //     center: center
        // }
        //
        // function loadMap() { (
        //     var map = new google.maps.Map(document.getElementById('map'), options)
        // }
        //
        // function addMarker(coord) {
        //     var marker = new google.maps.Marker({
        //         position:coord,
        //         map:map,
        //         icon: Icon
        //     })
        // }
        //
        // return (
        //     <div id="map"> </div>
        // );

        // let location = {
        //     address: prelimAddress + zip.toString(),
        //     lat: ,
        //     lng: -86.78406041733878,
        // }
        //

    }


}
import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'


const Map = ({ location, zoomLevel }) => (
    <div className="map">
        <h2 className="map-h2">Nashville Volunteer Opportunities</h2>

        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }} //api key goes here
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
            </GoogleMapReact>
        </div>
    </div>
)


export default Map
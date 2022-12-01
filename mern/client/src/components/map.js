import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

import { Icon } from '@iconify/react'

const Map = ({ location, zoomLevel, center }) => (
    <div className="map">
        <h2 className="map-h2">Nashville Volunteer Opportunities</h2>

        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDl72eXsRqkb6ZN-y9cgoxIqJ97XYKvsp8' }} //api key goes here
                center={center}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                    text={location.address}
                />
            </GoogleMapReact>

        </div>
    </div>
)

const LocationPin = ({ text }) => (
    <div className="pin">
        <Icon icon="akar-icons:location" className="pin-icon"/>
        <p className="pin-text">{text}</p>
    </div>
)
export default Map
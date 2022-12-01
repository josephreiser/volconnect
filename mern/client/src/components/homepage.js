import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const portal = [
    { id: 1, name: "volunteerPortal" },
    { id: 2, name: "nonprofitPortal" },
    { id: 3, name: "userSignup" }

];

export default function Homepage() {
    return (
        <div>
            <h1 id="homeTitle">VolunteerConnect</h1>
            <body>Volunteer Connect is the best place to find community service events in your area and keep track of your hours for volunteering or court-mandated hours.</body>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                <div>
                    <h2>Volunteers</h2>
                    <h5>With VolunteerConnect, you can register for events hosted by nonprofits in your area and keep track of your volunteering history. Click below for more options and information.</h5>
                    <Card.Body>

                        <Card.Title>Find Opportunities</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Link to={`/${"volunteerPortal"}`}>
                            <Button variant="primary">Click Here</Button>
                        </Link>
                    </Card.Body>
                </div>
                <div>
                    <h2>Non-Profits</h2>
                    <h5>With VolunteerConnect, you can register your non-profit's events in the area and recruit local volunteers to come help. Click below for more options and information.</h5>
                    <Card.Body>

                        <Card.Title>Find Opportunities</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Link to={`/${"nonprofitPortal"}`}>
                            <Button variant="primary">Click Here</Button>
                        </Link>
                    </Card.Body>
                </div>
                <div>
                    <h2>Sign Up here to begin attending events and to keep track of your hours of service!</h2>
                    <Card.Body>

                        <Card.Title>Find Opportunities</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Link to={`/${"userSignup"}`}>
                            <Button variant="primary">Click Here</Button>
                        </Link>
                    </Card.Body>
                </div>
            </div>
        </div>
    );
}

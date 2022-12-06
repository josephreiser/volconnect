import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const portal = [
    { id: 1, name: "volunteerPortal", buttonLabel: "Click here to find volunteering events" },
    { id: 2, name: "nonprofitPortal", buttonLabel: "Click here to set up an event for your nonprofit"  },
    { id: 3, name: "userSignup" , buttonLabel: "Click here to register as a volunteer!" },
    { id: 4, name: "nonprofitSignup" , buttonLabel: "Click here to register your nonprofit!" }

];

export default function Homepage() {
    return (
        <div>
            <h1 id="homeTitle">VolunteerConnect</h1>
            <body>Volunteer Connect is the best place to find community service events in your area and keep track of your hours for volunteering or court-mandated hours.</body>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                <div>
                    <h2>Volunteers</h2>
                    <h5>With VolunteerConnect, you can register for events hosted by nonprofits in your area and keep track of your volunteering history.</h5>
                    <Card.Body>

                        <Card.Img className="cardCover" variant="top" src={"assets/nonprofit.png"} />
                        <Card.Title>Click here to find volunteering events</Card.Title>

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
                        <Card.Img className="cardCover" variant="top" src={"assets/volunteer.png"} />
                        <Card.Title>Click here to set up an event for your nonprofit and begin finding volunteers</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Link to={`/${"nonprofitRedirect"}`}>
                            <Button variant="primary">Click Here</Button>
                        </Link>
                    </Card.Body>
                </div>
                <div>
                    <h2> Register </h2>
                    <div>
                        <h5>Sign up here to begin attending events and to keep track of your hours of service!</h5>
                        <Card.Body>


                            <Link to={`/${"userSignup"}`}>
                                <Button variant="primary">Register as a volunteer</Button>
                            </Link>
                        </Card.Body>
                    </div>
                    <div>
                        <h5>Sign up here to begin recruiting volunteers for your events!</h5>
                        <Card.Body>

                            <Link to={`/${"nonprofitSignup"}`}>
                                <Button variant="primary">Register your Nonprofit</Button>
                            </Link>
                        </Card.Body>
                    </div>
                </div>
            </div>
        </div>
    );
}

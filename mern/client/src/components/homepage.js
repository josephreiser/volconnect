import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const portal = [
    { id: 1, name: "nonprofitPortal"},
    { id: 2, name: "RomCom"}
];

export default function Homepage(){
    return(
        <div>
            <h2 id="homeTitle">VolunteerConnect</h2>
            <Container>
                <Row md={portal.length}>
                    {portal.map(portal => {
                        return(
                            <Col key={portal.id}>
                                <Card style={{ width: '18rem' }}>
                                <Card.Img className="cardCover" variant="top" src={"assets/"+portal.name+".png"} />
                                <Card.Body>
                                    <Card.Title>Find Opportunities</Card.Title>
                                    <Card.Text>
                                   
                                    </Card.Text>
                                    <Link to={`/${portal.name}`}>
                                        <Button variant="primary">Click Here</Button>
                                    </Link>
                                </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}
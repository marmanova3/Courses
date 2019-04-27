import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import './Events.css';
import { Container, Row, Col } from 'reactstrap';

const EventsList = ({ courseEvents }) => (
    <ListGroup>
        {courseEvents.filter(event => { return event.type === "Block"; }).map(event => (
            <ListGroupItem key={event.eid}  className="block-item">
                <h2 className="name">{event.name}</h2>
                <p className="about">{event.about}</p>
                <span>
                  <strong> Date and time:</strong> {event.timestamp.toString()}
                </span>
                <span>
                  <strong> Duration:</strong> {event.duration}
                </span>

                <Container>
                    <Row>
                        <Col>
                            <ListGroup className="sessions">
                                <h3>Sessions</h3>
                                {courseEvents.filter(event => { return event.type === "Session"; }).map(event => (
                                    <ListGroupItem key={event.eid} className="subevents-item">
                                        <span>{event.name}</span>
                                    </ListGroupItem>
                                    ))}
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroup className="tasks">
                                <h3>Tasks</h3>
                                {courseEvents.filter(event => { return event.type === "Task"; }).map(event => (
                                    <ListGroupItem key={event.eid} className="subevents-item">
                                        <span>{event.name}</span>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>

            </ListGroupItem>
        ))}
    </ListGroup>
);

const BlockMenu = ({ courseEvents }) => (
    <ListGroup className="block-menu">
        <ListGroupItem className="timeline block-menu-item">Timeline</ListGroupItem>
        {courseEvents.filter(event => { return event.type === "Block"; }).map(event => (
            <ListGroupItem key={event.eid} className="block-menu-item">
                {event.name}
            </ListGroupItem>
        ))}
    </ListGroup>
);

export default EventsList;

export { BlockMenu };
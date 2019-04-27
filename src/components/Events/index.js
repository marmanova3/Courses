import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';


const EventsList = ({ courseEvents, type }) => (
    <ListGroup>
        {courseEvents.filter(event => { return event.type === type; }).map(event => (
            <ListGroupItem key={event.eid}>
                <span>
                  <strong> Name:</strong> {event.name}
                </span>
                <span>
                  <strong> Date and time:</strong> {event.timestamp.toString()}
                </span>
                <span>
                  <strong> Duration:</strong> {event.duration}
                </span>
                <span>
                  <strong> Location:</strong> {event.location}
                </span>
            </ListGroupItem>
        ))}
    </ListGroup>
);

const BlockMenu = ({ courseEvents }) => (
    <ListGroup>
        {courseEvents.filter(event => { return event.type === "Block"; }).map(event => (
            <ListGroupItem key={event.eid}>
                {event.name}
            </ListGroupItem>
        ))}
    </ListGroup>
);

export default EventsList;

export { BlockMenu };
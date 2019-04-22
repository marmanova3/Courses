import React from "react";

const EventsList = ({ courseEvents }) => (
    <ul>
        {courseEvents.map(event => (
            <li key={event.eid}>
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
            </li>
        ))}
    </ul>
);

export default EventsList;
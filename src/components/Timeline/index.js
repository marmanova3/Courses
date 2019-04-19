import withAuthorization from "../Session/withAuthorization";
import {Component} from "react";
import React from "react";

class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            courseInstance: undefined,
            name: "",
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        const { match: { params } } = this.props;

        this.props.firebase.courseInstance(params.id)
            .get()
            .then(snapshot => {
                const courseInstance = snapshot.data();

                this.setState({
                    courseInstance,
                });

                this.props.firebase.course(courseInstance.instanceOf)
                    .get()
                    .then(snapshot => {
                        const course = snapshot.data();

                        this.setState({
                            name: course.name,
                        });
                    })

                this.props.firebase
                    .courseEvents()
                    .where("course", "==", params.id)
                    .get()
                    .then(snapshot => {
                        let events = [];

                        snapshot.forEach(doc =>
                            events.push({ ...doc.data(), timestamp: doc.data().dateTime.toDate(), eid: doc.id }),
                            // console.log(doc.data().dateTime.toDate())
                        );

                        this.setState({
                            loading: false,
                            events: events,
                        });
                    });
            });
    }

    render() {
        return (
            <div>
                <h1>Timeline</h1>
                <h2>{this.state.name}</h2>
                <EventsList courseEvents={this.state.events}/>
            </div>
        );
    }
};

const EventsList = ({ courseEvents }) => (
    <ul>
        {courseEvents.map(event => (
            <li key={event.eid}>
                {/*<span>*/}
                    {/*<strong> ID:</strong> {event.eid}*/}
                {/*</span>*/}
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

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Timeline);
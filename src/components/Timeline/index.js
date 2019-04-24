import withAuthorization from "../Session/withAuthorization";
import {Component} from "react";
import React from "react";
import EventsList from "../Events"
import { isEnrolledIn } from "../Enrollments";

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

                if(courseInstance) {
                    this.setState({
                        courseInstance,
                    });

                    this.props.firebase.course(this.state.courseInstance.instanceOf)
                        .get()
                        .then(snapshot => {
                            const course = snapshot.data();

                            this.setState({
                                name: course.name,
                            });
                        });

                    this.props.firebase
                        .courseEvents()
                        .where("course", "==", params.id)
                        .get()
                        .then(snapshot => {
                            let events = [];

                            snapshot.forEach(doc =>
                                    events.push({...doc.data(), timestamp: doc.data().dateTime.toDate(), eid: doc.id}),
                            );

                            this.setState({
                                loading: false,
                                events: events,
                            });
                        });
                }
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
}

const condition = authUser => !!authUser;

// const condition = ({authUser, course}) => authUser && isEnrolledIn(authUser.uid, course.cid);

export default withAuthorization(condition)(Timeline);
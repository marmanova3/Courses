import React, { Component } from 'react';
import {withFirebase} from "../Firebase";
import withAuthorization from "../Session/withAuthorization";
import { withRouter } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import {compose} from "recompose";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {NavigationCourse} from "../Navigation";

class CreateTimeline extends Component {
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
                const courseInstance = { ...snapshot.data(), cid: snapshot.id };

                if(courseInstance) {
                    this.setState({
                        courseInstance: courseInstance,
                    });
                    console.log(this.state.courseInstance)


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
                <NavigationCourse authUser={this.props.authUser} course={this.state.courseInstance}/>
                <main>
                    <div>
                        <h1>Create Timeline</h1>
                        <div className="main">
                            <h2>New Event</h2>
                            <CreateTimelineForm/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
const INITIAL_STATE = {
    name: '',
    about: '',
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    location: '',
    type: 'session',
};

class CreateBlockForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const {
            name,
            about,
            fromDate,
            fromTime,
            toDate,
            toTime,
            location,
            type
        } = this.state;

        this.props.firebase.courseEvents()
            .add({
                name: name,
                about: about,
                location: location,
                type: type,
                dateTime: fromDate+" "+fromTime,
                duration: 60,
            })
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.TIMELINE);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            name,
            about,
            fromDate,
            fromTime,
            toDate,
            toTime,
            location,
            type,
        } = this.state;

        const isInvalid =
            name === '' ||
            about === '' ||
            fromDate === '' ||
            fromTime === '' ||
            toDate === '' ||
            toTime === '' ||
            location === '';

        return(
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        name="name"
                        id="name"
                        value={name}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Name"
                    />
                    <Label for="about">About</Label>
                    <Input
                        name="about"
                        id="about"
                        value={about}
                        onChange={this.onChange}
                        type="textarea"
                        placeholder="About"
                    />
                    <Label for="location">Location</Label>
                    <Input
                        name="location"
                        id="location"
                        value={location}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Location"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="fromDate">From date</Label>
                    <Input
                        name="fromDate"
                        id="fromDate"
                        value={fromDate}
                        onChange={this.onChange}
                        type="date"
                        placeholder="From Date"
                    />
                    <Label for="fromTime">From time</Label>
                    <Input
                        name="fromTime"
                        id="fromTime"
                        value={fromTime}
                        onChange={this.onChange}
                        type="time"
                        placeholder="From Time"
                    />
                    <Label for="toDate">To date</Label>
                    <Input
                        name="toDate"
                        id="toDate"
                        value={toDate}
                        onChange={this.onChange}
                        type="date"
                        min={Date.now()}
                        placeholder="To Date"
                    />
                    <Label for="toTime">To time</Label>
                    <Input
                        name="toTime"
                        id="toTime"
                        value={toTime}
                        onChange={this.onChange}
                        type="time"
                        placeholder="To Time"
                    />
                    <Label for="type">Type</Label>
                    <Input id="type" type="select" name="type" value={type} onChange={this.onChange}>
                        <option value="Session">Session</option>
                        <option value="Task">Task</option>
                        <option value="Block">Block</option>
                    </Input>
                </FormGroup>

                <Button disabled={isInvalid} type="submit">
                    Create
                </Button>
            </Form>
        )
    }
}

const CreateTimelineForm = compose(
    withRouter,
    withFirebase
)(CreateBlockForm);

const condition = authUser => !!authUser;

// const condition = ({authUser, course}) => authUser && (authUser.uid===course.hasInstructor);

export default withAuthorization(condition)(CreateTimeline);

export { CreateTimelineForm };
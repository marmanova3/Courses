import React, { Component } from 'react';
import withAuthorization from "../Session/withAuthorization";

const CreateTimeline = () => (
    <div>
        <h1>Create Timeline</h1>
        <CreateBlockForm />
    </div>
);

const INITIAL_STATE = {
    name: '',
    about: '',
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    location: '',
    type: 'session',
    error: null,
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

        let fromDateTime = new Date(fromDate+" "+fromTime);
        let toDateTime = new Date(toDate+" "+toTime);
        console.log(fromDateTime);
        console.log(toDateTime);
        console.log(fromDate+" "+fromTime);
        // let duration = fromDateTime

        this.props.firebase.courseEvents().doc()
            .add({
                name: name,
                about: about,
                location: location,
                type: type,
                dateTime: fromDate+" "+fromTime,
                duration: 60,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        console.log(type);
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
            error
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
            <form onSubmit={this.onSubmit}>
                <input
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Name"
                /><br></br>
                <input
                    name="about"
                    value={about}
                    onChange={this.onChange}
                    type="textarea"
                    placeholder="About"
                /><br></br>
                <input
                    name="location"
                    value={location}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Location"
                /><br></br>
                <input
                    name="fromDate"
                    value={fromDate}
                    onChange={this.onChange}
                    type="date"
                    placeholder="From Date"
                /><br></br>
                <input
                    name="fromTime"
                    value={fromTime}
                    onChange={this.onChange}
                    type="time"
                    placeholder="From Time"
                /><br></br>
                <input
                    name="toDate"
                    value={toDate}
                    onChange={this.onChange}
                    type="date"
                    min={Date.now()}
                    placeholder="To Date"
                /><br></br>
                <input
                    name="toTime"
                    value={toTime}
                    onChange={this.onChange}
                    type="time"
                    placeholder="To Time"
                /><br></br>
                <select name="type" value={type} onChange={this.onChange}>
                    <option value="session">Session</option>
                    <option value="task">Task</option>
                    <option value="block">Block</option>
                </select>
                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CreateTimeline);
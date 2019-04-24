import React, {Component} from 'react';
import {CourseContext, withAuthorization} from '../Session';
import {Link} from "react-router-dom";
import {Enroll} from "../Enrollments";

class CoursesPage extends Component {
    constructor(props) {
        super(props);
        this.enroll = this.enroll.bind(this);

        this.state = {
            loading: false,
            courses: [],
            myCourses: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        let courseInstances = [];
        let courses = [];
        let combined = [];

        this.props.firebase.courseInstances()
            .get()
            .then(snapshot => {

                snapshot.forEach(doc =>
                    courseInstances.push({ ...doc.data(), cid: doc.id }),
                );

                this.props.firebase.courses()
                    .get()
                    .then(snapshot => {

                        snapshot.forEach(doc => {
                            courses.push({...doc.data(), cid: doc.id});
                        });

                        courseInstances.forEach(courseInstance => {
                            let course = courses.find(course => (courseInstance.instanceOf === course.cid));
                            combined.push({...courseInstance, ...course, cid: courseInstance.cid});
                        });

                        this.setState({
                            courses: combined,
                            loading: false,
                        });
                    })
                    .then(
                        this.props.firebase.enrollments()
                            .where("user", "==", this.props.authUser.uid)
                            .get()
                            .then(snapshot => {
                                let enrollments = [];

                                snapshot.forEach(doc => {
                                    enrollments.push({...doc.data()});
                                });
                                let myCourses = [];
                                this.state.courses.forEach(course => {enrollments.forEach(enrollment => {
                                    if (course.cid === enrollment.courseInstance) {
                                        myCourses.push(course);
                                    }
                                })});

                                this.setState({
                                    myCourses,
                                })
                            })
                        )
                    })
    }

    enroll(course) {
        if (Enroll(this.props.authUser.uid, course.cid, this.props.firebase)){
            this.props.history.push({
                pathname: '/timeline/'+ course.cid
            });
        }
    }

    render() {
        const {courses, myCourses, loading} = this.state;

        return (
            <div>
                <h1>Welcome to Courses</h1>

                {loading && <div>Loading ...</div>}

                <h2>My Courses</h2>
                <CoursesList courses={myCourses} fun={()=>true}  button={false} enroll={this.enroll}/>

                <h2>Active Courses</h2>
                <CoursesList courses={courses} fun={activeCourses} button={true} enroll={this.enroll}/>

                <h2>Archived Courses</h2>
                <CoursesList courses={courses} fun={archivedCourses} button={false} enroll={this.enroll}/>
            </div>
        );
    }

}

function activeCourses(year) {
    return year === 2019;
}

function archivedCourses(year) {
    return year < 2019;
}

const CoursesList = ({ courses, fun, button, enroll }) => (
    <CourseContext.Consumer>
    {({course, setCourse}) => (
        <ul>
        {courses.filter(courses => (fun(courses.year))).map(course => (
            <li key={course.cid} onClick={() => setCourse(course)}>
                <Link to={'/timeline/'+course.cid}>
                    <span>
                  <strong> Name:</strong> {course.name}
                </span>
                    <span>
                  <strong> About:</strong> {course.about}
                </span>
                    <span>
                  <strong> Abbr:</strong> {course.abbreviation}
                </span>
                    <span>
                  <strong> Year:</strong> {course.year}
                </span>
                    {button && <button onClick={() => {
                        enroll(course)
                    }}>Enroll</button>}
                </Link>
            </li>
        ))}
        </ul>
        )}
    </CourseContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CoursesPage);

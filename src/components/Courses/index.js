import React, {Component} from 'react';
import { withAuthorization } from '../Session';
import {Link} from "react-router-dom";

class CoursesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            courses: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        let courseInstances = []
        let courses = []
        let combined = []

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
                            courses.push({ ...doc.data(), cid: doc.id });
                        });

                        courseInstances.forEach(courseInstance => {
                            let course = courses.find(course => (courseInstance.instanceOf === course.cid));
                            combined.push({...courseInstance, ...course, cid: courseInstance.cid});
                        })

                        this.setState({
                            courses: combined,
                            loading: false,
                        });
                    })
            })
    }

    // enroll() {
    //     authUser
    //     this.props.firebase.use
    // this.props.firebase.enrollments().doc().add({
                                                // })
    // }

    render() {
        const {courses, loading} = this.state;

        return (
            <div>
                <h1>Welcome to Courses</h1>

                {loading && <div>Loading ...</div>}

                <h2>My Courses</h2>
                <CoursesList courses={courses} fun={myCourses}  button={false}/>

                <h2>Active Courses</h2>
                <CoursesList courses={courses} fun={activeCourses} button={true}/>

                <h2>Archived Courses</h2>
                <CoursesList courses={courses} fun={archivedCourses} button={false}/>
            </div>
        );
    }

};

function myCourses() {
    return true;
}

function activeCourses(year) {
    return year === 2019;
}

function archivedCourses(year) {
    return year < 2019;
}

const CoursesList = ({ courses, fun, button }) => (
    <ul>
        {courses.filter(courses => (fun(courses.year))).map(course => (
            <Link to={'/timeline/'+course.cid}>
            <li key={course.cid}>
                {/*<span>*/}
                  {/*<strong> ID:</strong> {course.cid}*/}
                {/*</span>*/}
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
                {button && <button>Enroll</button>}
            </li>
            </Link>
        ))}
    </ul>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(CoursesPage);
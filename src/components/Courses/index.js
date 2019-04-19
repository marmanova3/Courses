import React, {Component} from 'react';
import { withAuthorization } from '../Session';

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

        this.unsubscribe = this.props.firebase
            .courses()
            .onSnapshot(snapshot => {
                let courses = [];

                snapshot.forEach(doc =>
                    courses.push({ ...doc.data(), cid: doc.id }),
                );

                this.setState({
                    courses,
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {courses, loading} = this.state;

        return (
            <div>
                <h1>Welcome to Courses</h1>

                {loading && <div>Loading ...</div>}
                <CoursesList courses={courses}/>
            </div>
        );
    }

};


const CoursesList = ({ courses }) => (
    <ul>
        {courses.map(course => (
            <li key={course.cid}>
                <span>
                  <strong> ID:</strong> {course.cid}
                </span>
                <span>
                  <strong> Name:</strong> {course.name}
                </span>
                <span>
                  <strong> About:</strong> {course.about}
                </span>
                <span>
                  <strong> Abbr:</strong> {course.abbreviation}
                </span>
            </li>
        ))}
    </ul>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(CoursesPage);
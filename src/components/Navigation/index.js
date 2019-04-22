import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';
import { CourseContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? (
           <CourseContext.Consumer>
               {({course, setCourse}) => course ? (
                   <NavigationCourse authUser={authUser} course={course} />
                ) : (
                   <NavigationAuth authUser={authUser} />
                )}
            </CourseContext.Consumer>
        ) : (
            <NavigationNonAuth />
        )}
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <ul>
        {/*<li>*/}
            {/*<Link to={ROUTES.LANDING}>Landing</Link>*/}
        {/*</li>*/}
        <li>
            <Link to={ROUTES.COURSES}>Courses</Link>
        </li>
        {authUser.roles.includes(ROLES.ADMIN) && (
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        )}
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);

const NavigationCourse = ({ authUser, course }) => (
  <ul>
      <li>
          <Link to={ROUTES.TIMELINE}>Timeline</Link>
      </li>
      { course.hasInstructor === authUser.uid && (
      <li>
          <Link to={ROUTES.CREATE_TIMELINE}>Create Timeline</Link>
      </li>
      )}
      <li>Topics</li>
      <li>Results</li>
      <li>Assignments</li>
      <li>Documents</li>
      <li>Quiz</li>
      <li>Info</li>
  </ul>
);

export default Navigation;
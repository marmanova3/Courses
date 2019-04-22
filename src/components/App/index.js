import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import CreateTimeline from "../CreateTimeline";
import CoursesPage from '../Courses';
import Timeline from '../Timeline';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { withCourse } from '../Session';
import {compose} from "recompose";

const AppBase = () => (
    <Router>
        <div>
            <Navigation />

            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.COURSES} component={CoursesPage} />
            <Route path={ROUTES.TIMELINE} component={Timeline} />
            <Route path={ROUTES.CREATE_TIMELINE} component={CreateTimeline} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </Router>
);

const App = compose(
    withCourse,
    withAuthentication,
)(AppBase);

export default App;

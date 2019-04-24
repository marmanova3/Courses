import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';
import { CourseContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import style from './style.css';

const Navigation = () => (
    <Navbar class="navbar" expand="md">
        <NavbarBrand class="navbrand" href="/">Matfyz</NavbarBrand>
        <NavbarToggler />
        {/*onClick={this.toggle} />*/}

        <AuthUserContext.Consumer>
        {authUser => authUser ? (
           <CourseContext.Consumer>
               {({course, setCourse}) => course ? (
                   <NavigationCourse authUser={authUser} course={course} setCourse={setCourse}/>
                ) : (
                   <NavigationAuth authUser={authUser} />
                )}
            </CourseContext.Consumer>
        ) : (
            <NavigationNonAuth />
        )}
    </AuthUserContext.Consumer>
    </Navbar>
);

const NavigationAuth = ({ authUser }) => (
    <Nav>
        <NavItem>
            <NavLink>
                <Link to={ROUTES.COURSES}>Courses</Link>
            </NavLink>
        </NavItem>
        {authUser.roles.includes(ROLES.ADMIN) && (
            <NavItem>
                <NavLink>
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                </NavLink>
            </NavItem>
        )}
        <NavItem>
            <NavLink>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
                <SignOutButton />
            </NavLink>
        </NavItem>
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav>
        <NavItem>
            <NavLink>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </NavLink>
        </NavItem>
    </Nav>
);

const NavigationCourse = ({ authUser, course, setCourse }) => (
  <Nav>
      <NavItem onClick={() => setCourse(null)}>
          <NavLink>
            <Link to={ROUTES.COURSES}>Back to Courses</Link>
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink>
            <Link to={'/timeline/'+course.cid}>Timeline</Link>
          </NavLink>
      </NavItem>
      { course.hasInstructor === authUser.uid && (
      <NavItem>
          <NavLink>
            <Link to={ROUTES.CREATE_TIMELINE}>Create Timeline</Link>
          </NavLink>
      </NavItem>
      )}
      <NavItem>
          <NavLink>
            Topics
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink>
              Results
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink>
              Assignments
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink>
              Documents
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink>
              Quiz
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink>
              Info
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink>
              <SignOutButton />
          </NavLink>
      </NavItem>
  </Nav>
);

export default Navigation;
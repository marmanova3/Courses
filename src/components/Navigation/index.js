import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import './Navigation.css';

const Navigation = () => (
    <Navbar class="navbar" expand="md">
        <NavbarBrand href="/">Matfyz</NavbarBrand>
        <NavbarToggler />
        {/*onClick={this.toggle} />*/}
        <AuthUserContext.Consumer>
        {authUser => authUser ? (
            <NavigationAuth authUser={authUser} />
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

const NavigationCourse = ({ authUser, course }) => (
    <Navbar class="navbar" expand="md">
        <NavbarBrand href="/">Matfyz</NavbarBrand>
        <NavbarToggler />
        <Nav>
            {course &&
            <NavItem>
                <NavLink>
                    <Link to={ROUTES.TIMELINE + course.cid}>Timeline</Link>
                </NavLink>
            </NavItem>
            }
            {course && course.hasInstructor === authUser.uid &&
                <NavItem>
                  <NavLink>
                    <Link to={ROUTES.CREATE_TIMELINE + course.cid}>Create Timeline</Link>
                  </NavLink>
                </NavItem>
            }
            <NavItem>
              <NavLink>
                  <span className="fake-nav">Topics</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <span className="fake-nav">Results</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <span className="fake-nav">Assignments</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <span className="fake-nav">Documents</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <span className="fake-nav">Quiz</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <span className="fake-nav">Info</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <SignOutButton />
              </NavLink>
            </NavItem>
        </Nav>
    </Navbar>
);

export default Navigation;

export { NavigationCourse };
import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import Navigation from "../Navigation";

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <Navigation />
                <main>
                    <div>
                        <h1>Account: {authUser.email}</h1>
                        <h2>Reset password</h2>
                        <PasswordForgetForm />
                        <br></br>
                        <h2>Change password</h2>
                        <PasswordChangeForm />
                    </div>
                </main>
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
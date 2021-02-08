import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Teachers from '../pages/Teachers';
import Configurations from '../pages/Configurations';
import Support from '../pages/Support';
import Programs from '../pages/Programs';
import Reports from '../pages/Reports';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    {/* <Route path="/signup" component={SignUp} /> */}
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/home" component={Home} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/teachers" component={Teachers} isPrivate />
    <Route path="/configurations" component={Configurations} isPrivate />
    <Route path="/support" component={Support} isPrivate />
    <Route path="/programs" component={Programs} isPrivate />
    <Route path="/reports" component={Reports} isPrivate />
  </Switch>
);

export default Routes;

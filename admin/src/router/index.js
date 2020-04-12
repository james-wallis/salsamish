import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from '../pages/index';
// import 'antd/dist/antd.css';

import Login from '../pages/user/login';

import EmployeeViewAll from '../pages/employees/viewAll';
import EmployeeAdd from '../pages/employees/add';
import EmployeeViewSingle from '../pages/employees/viewSingle';

import EventViewAll from '../pages/events/viewAll';
import EventAdd from '../pages/events/add';
import EventViewSingle from '../pages/events/viewSingle';
import EventEdit from '../pages/events/edit';

import ManageAccount from '../pages/user/manage';
import ResetPassword from '../pages/user/resetPassword';
import SetNewPasswordUsingToken from '../pages/user/setNewPasswordUsingToken';

class CustomRoutes extends React.Component {
  constructor(props) {
    super(props)

    this.setAuthenticated = this.setAuthenticated.bind(this)
    this.state = {
      authenticated: false,
      user: null,
    }
  }

  setAuthenticated(newState) {
    const { authenticated, user } = newState;
    this.setState({
      authenticated,
      user,
    });
  }

  render() {
    const { authenticated, user } = this.state;
    return <Router>
      <Route path="/" exact render={() => <Index authenticated={authenticated} user={user} setAuth={this.setAuthenticated} />} />
      <Route path="/login" component={Login} />
      <Route path="/reset-password" exact component={ResetPassword} />
      <Route path="/reset-password/:userID/:token" exact component={SetNewPasswordUsingToken} />
      <Route path="/employees" exact render={() => <EmployeeViewAll authenticated={authenticated} user={user} setAuth={this.setAuthenticated} />} />
      <Route path="/employees/add" render={() => <EmployeeAdd authenticated={authenticated} user={user} setAuth={this.setAuthenticated}/>} />
      <Route path="/employees/view" render={() => <EmployeeViewSingle authenticated={authenticated} user={user} setAuth={this.setAuthenticated}/>} />
      <Route path="/events" exact render={() => <EventViewAll authenticated={authenticated} user={user} setAuth={this.setAuthenticated}/>} />
      <Route path="/events/add" render={() => <EventAdd authenticated={authenticated} user={user} setAuth={this.setAuthenticated}/>} />
      <Route path="/events/view" render={() => <EventViewSingle authenticated={authenticated} user={user} setAuth={this.setAuthenticated}/>} />
      <Route path="/events/edit" render={() => <EventEdit authenticated={authenticated} user={user} setAuth={this.setAuthenticated}/>} />
      <Route path="/account" render={() => <ManageAccount authenticated={authenticated} user={user} setAuth={this.setAuthenticated} />} />
    </Router>
  }
}

export default CustomRoutes;

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

class CustomRoutes extends React.Component {
  constructor(props) {
    super(props)

    this.setAuthenticated = this.setAuthenticated.bind(this)
    this.state = {
      authenticated: false
    }
  }

  setAuthenticated(newState) {
    this.setState({
      authenticated: newState
    });
  }

  render() {
    const { authenticated } = this.state;
    return <Router>
      <Route path="/" exact render={() => <Index authenticated={authenticated} setAuth={this.setAuthenticated} />} />
      <Route path="/login" component={Login} />
      <Route path="/employees" exact render={() => <EmployeeViewAll authenticated={authenticated} setAuth={this.setAuthenticated} />} />
      <Route path="/employees/add" render={() => <EmployeeAdd authenticated={authenticated} setAuth={this.setAuthenticated}/>} />
      <Route path="/employees/view" render={() => <EmployeeViewSingle authenticated={authenticated} setAuth={this.setAuthenticated}/>} />
      <Route path="/events" exact render={() => <EventViewAll authenticated={authenticated} setAuth={this.setAuthenticated}/>} />
      <Route path="/events/add" render={() => <EventAdd authenticated={authenticated} setAuth={this.setAuthenticated}/>} />
      <Route path="/events/view" render={() => <EventViewSingle authenticated={authenticated} setAuth={this.setAuthenticated}/>} />
      <Route path="/events/edit" render={() => <EventEdit authenticated={authenticated} setAuth={this.setAuthenticated}/>} />
      <Route path="/account" render={() => <ManageAccount authenticated={authenticated} setAuth={this.setAuthenticated} />} />
    </Router>
  }
}

export default CustomRoutes;

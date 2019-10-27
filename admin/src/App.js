import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './pages/index';
import 'antd/dist/antd.css';

import Login from './pages/user/login'

import EmployeeViewAll from './pages/employees/viewAll'
import EmployeeAdd from './pages/employees/add'
import EmployeeViewSingle from './pages/employees/viewSingle'

import EventViewAll from './pages/events/viewAll'
import EventAdd from './pages/events/add'
import EventViewSingle from './pages/events/viewSingle'
import EventEdit from './pages/events/edit'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/employees" exact component={EmployeeViewAll} />
      <Route path="/employees/add" component={EmployeeAdd} />
      <Route path="/employees/view" component={EmployeeViewSingle} />
      <Route path="/events" exact component={EventViewAll} />
      <Route path="/events/add" component={EventAdd} />
      <Route path="/events/view" component={EventViewSingle} />
      <Route path="/events/edit" component={EventEdit} />
    </Router>
  );
}

export default App;

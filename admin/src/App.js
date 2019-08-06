import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './pages/index';
import Title from './components/title';
import Navigation from './components/navigation';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import EmployeeViewAll from './pages/employees/viewAll'
import EmployeeAdd from './pages/employees/add'
import EmployeeViewSingle from './pages/employees/viewSingle'

import EventViewAll from './pages/employees/viewAll'
import EventAdd from './pages/events/add'
import EventViewSingle from './pages/employees/viewSingle'


const { Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider>
          <Title />
          <Navigation />
        </Sider>
        <Content style={{ background: '#ECECEC', padding: '50px' }}>
          <Route path="/" exact component={Index} />
          <Route path="/employees" exact component={EmployeeViewAll} />
          <Route path="/employees/add" component={EmployeeAdd} />
          <Route path="/employees/view" component={EmployeeViewSingle} />
          <Route path="/events" exact component={EventViewAll} />
          <Route path="/events/add" component={EventAdd} />
          <Route path="/events/view" component={EventViewSingle} />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;

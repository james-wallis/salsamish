import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter } from "react-router-dom";


const { SubMenu } = Menu;

class Navigation extends React.Component {
  state = {
    collapsed: false,
  };

  render() {
    const { history } = this.props;
    return (
      <div style={{ width: 'auto' }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" onClick={() => { history.push('/') }}>
            <Icon type="home" />
            <span>Overview</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>Employees</span>
              </span>
            }
          >
            <Menu.Item key="2" onClick={() => { history.push('/employees/') }}>
              <span>View</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => { history.push('/employees/add') }}>
              <span>Add</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => { history.push('/employees/delete') }}>
              <span>Delete</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="calendar" />
                <span>Events</span>
              </span>
            }
          >
            <Menu.Item key="5">View</Menu.Item>
            <Menu.Item key="6">Add</Menu.Item>
            <Menu.Item key="7">Delete</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navigation);
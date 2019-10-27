import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';


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
          // defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
          theme="dark"
          selectedKeys={[selectedItem(history.location.pathname)]}
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" onClick={() => { history.push('/') }}>
            <Icon type="home" />
            <span>This Week</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>Team Members</span>
              </span>
            }
          >
            <Menu.Item key="2" onClick={() => { history.push('/employees/') }}>
              <span>Overview</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => { history.push('/employees/view') }}>
              <span>View</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => { history.push('/employees/add') }}>
              <span>Add</span>
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
            <Menu.Item key="5" onClick={() => { history.push('/events/') }}>
              <span>Overview</span>
            </Menu.Item>
            <Menu.Item key="6" onClick={() => { history.push('/events/view') }}>
              <span>View</span>
            </Menu.Item>
            <Menu.Item key="7" onClick={() => { history.push('/events/add') }}>
              <span>Add</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

const selectedItem = path => {
  switch (path) {
    case '/':
      return '1';
    case '/employees/':
      return '2';
    case '/employees/view':
      return '3';
    case '/employees/add':
      return '4';
    case '/events/':
      return '5';
    case '/events/view':
      return '6';
    case '/events/add':
      return '7';
    default:
      return '';
  }
}

export default withRouter(Navigation);
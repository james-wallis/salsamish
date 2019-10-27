import React, { Component } from 'react';
import Title from './title';
import Navigation from './navigation';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

export default function withAuth(ComponentToSurround) {
  return class extends Component {
    render() {
      return (
        <React.Fragment>
          <Layout style={{ height: '100vh' }}>
            <Sider>
              <Title />
              <Navigation />
            </Sider>
            <Content style={{ background: '#ECECEC', padding: '50px' }}>
              <ComponentToSurround {...this.props} />
            </Content>
          </Layout>
        </React.Fragment>
      );
    }
  }
}
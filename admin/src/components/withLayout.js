import React, { Component } from 'react';
import Title from './title';
import Navigation from './navigation';
import { Layout } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const { Sider, Content } = Layout;

export default function withAuth(ComponentToSurround) {
  return class extends Component {
    constructor(props) {
      super();
      const { authenticated } = props;
      this.state = {
        loading: !authenticated,
        redirect: false,
      };
    }

    componentDidMount() {
      const { setAuth } = this.props;
      axios.get(`/api/user/auth`)
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
            setAuth(true);
          } else {
            const error = new Error(res.error);
            throw error;
          }
        }).catch((e) => {
          this.setState({ loading: false, redirect: true });
          setAuth(false);
        })
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
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
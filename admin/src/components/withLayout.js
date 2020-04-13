import React, { Component } from 'react';
import { Layout } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Title from './title';
import Navigation from './navigation';
import CurrentUser from './currentUser';

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
            axios.get('/api/auth')
                .then(res => {
                    if (res.status === 200) {
                        const user = res.data;
                        this.setState({ loading: false, redirect: false });
                        setAuth({ authenticated: true, user });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                }).catch((e) => {
                    this.setState({ loading: false, redirect: true });
                    setAuth({ authenticated: false });
                });
        }

        render() {
            const { loading, redirect } = this.state;
            const { user } = this.props;      
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
                            <CurrentUser user={user}/>
                        </Sider>
                        <Content style={{ background: '#ECECEC', padding: '50px' }}>
                            <ComponentToSurround {...this.props} user={user}  />
                        </Content>
                    </Layout>
                </React.Fragment>
            );
        }
    };
}
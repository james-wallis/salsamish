import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './user.css';

const { Title } = Typography;

class LoginForm extends React.Component {
  state = {
    credentialError: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFields }, history } = this.props;
    validateFields((err, values) => {
      if (!err) {
        axios.post('/api/auth', values)
          .then(res => {
            if (res.status === 200) {
              history.push('/');
            } else {
              const error = new Error(res.error);
              throw error;
            }
          }).catch(() => {
            this.setState({ credentialError: true });
          });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { credentialError } = this.state;
    return <div>
      <Form id="login-form" onSubmit={this.handleSubmit} className="login-form">
        <Title level={1}>Salsa Mish admin</Title>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email',
              message: 'The input is not a valid email address',
            },{ required: true, message: 'Please input your email' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
        <p>{(credentialError) ? 'Incorrect login details, please try again.' : null}</p>
      </Form>
      <div className='reset-password'>
        <Link to='/reset-password'>forgot password</Link>
      </div>
    </div>;
  }
}

LoginForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const wrappedLoginForm = Form.create({ name: 'login' })(LoginForm);
export default (wrappedLoginForm);
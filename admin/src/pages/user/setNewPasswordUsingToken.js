import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './user.css';

const { Title } = Typography;

class setNewPasswordUsingToken extends React.Component {
  state = {
    credentialError: false,
    changeSuccess: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const { match: { params: { userID, token } } } = this.props;
        axios.post(`/api/user/reset-password/${userID}/${token}`, values)
          .then(res => {
            if (res.status === 200) {
              this.setState({ changeSuccess: true });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          }).catch((err) => {
            this.setState({ credentialError: err });
          });
      }
    });
  };

  render() {    
    const { credentialError, changeSuccess } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    return <div className='reset-using-token'>
      <Title level={1}>Password reset</Title>
      <Form id="change-password-form" onSubmit={this.handleSubmit} className="change-password-form">
        {
          (changeSuccess)
            ? <div>
                <p>Password changed successfully</p>
                <Link to='/login'>
                  <Button type="primary">
                    Login
                  </Button>
                </Link>
              </div>
            : <div>
              <p>Enter a new password</p>
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
                <Button type="primary" htmlType="submit" className="change-password-form-button">
                  Submit
                </Button>
              </Form.Item>
            </div>
        }
        <p>{(credentialError) ? `Error changing password: ${credentialError}` : null}</p>
      </Form>
    </div>;
  }
}

setNewPasswordUsingToken.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      userID: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }),
  }),
};

const wrappedLoginForm = Form.create({ name: 'reset-password-using-token' })(setNewPasswordUsingToken);
export default wrappedLoginForm;
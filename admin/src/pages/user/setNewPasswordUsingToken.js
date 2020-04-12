import React from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
import './user.css';

const { Title } = Typography;

class setNewPasswordUsingToken extends React.Component {
  state = {
    credentialError: false,
    changeSuccess: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
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
          })
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
                <Link to='/login'>Login</Link>
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
    </div>
  }
}

const wrappedLoginForm = Form.create({ name: 'reset-password-using-token' })(setNewPasswordUsingToken);
export default wrappedLoginForm;
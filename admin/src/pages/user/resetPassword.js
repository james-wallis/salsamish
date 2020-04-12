import React from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
import axios from 'axios';
import './user.css';

const { Title } = Typography;

class ResetPasswordForm extends React.Component {
  state = {
    invalidEmail: false,
    emailSent: false,
    emailAddress: '',
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(`/api/user/reset-password`, values)
          .then(res => {
            if (res.status === 200) {
              const { email: emailAddress } = values;
              this.setState({ emailSent: true, emailAddress });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          }).catch(() => {
            this.setState({ invalidEmail: true });
          })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { invalidEmail, emailSent, emailAddress } = this.state;
    return <div>
      {(emailSent) ? showEmailSent(emailAddress) : showResetForm(getFieldDecorator, invalidEmail, this.handleSubmit)}
    </div>
  }
}

const showResetForm = (getFieldDecorator, invalidEmail, handleSubmit) => {
  return <Form id="login-form" onSubmit={handleSubmit} className="login-form">
    <Title level={1}>Salsa Mish admin</Title>
    <Title level={4}>Reset password</Title>
    <p>Enter the email address associated with the account</p>
    <Form.Item>
      {getFieldDecorator('email', {
        rules: [{
          type: 'email',
          message: 'The input is not a valid email address',
        }, { required: true, message: 'Please input your email' }],
      })(
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Email"
        />,
      )}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Reset
          </Button>
    </Form.Item>
    <p>{(invalidEmail) ? "Invalid email" : null}</p>
  </Form>
}

const showEmailSent = (emailAddress) => {
  return <div className='emailSent'>
    <Title level={1}>Salsa Mish admin</Title>
    <Title level={4}>Reset password</Title>
    <p>The email has been sent to: {emailAddress}</p>
  </div>
};

const wrappedResetPasswordForm = Form.create({ name: 'reset-password' })(ResetPasswordForm);
export default (wrappedResetPasswordForm);
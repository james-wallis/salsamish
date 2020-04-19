import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Typography } from 'antd';
import axios from 'axios';
import './user.css';

const { Title } = Typography;

class ResetPasswordForm extends React.Component {
  state = {
    invalidEmail: false,
    emailSent: false,
    emailAddress: '',
    error: null,
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/user/reset-password', values)
          .then(res => {
            if (res.status === 200) {
              const { email: emailAddress } = values;
              this.setState({ emailSent: true, emailAddress, invalidEmail: false, error: false });
            } else if (res.status === 404) {
              this.setState({ invalidEmail: true, error: null });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          }).catch((error) => {
            this.setState({ error, invalidEmail: false });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { invalidEmail, emailSent, emailAddress, error } = this.state;
    return <div>
      {(emailSent) ? showEmailSent(emailAddress) : showResetForm(getFieldDecorator, invalidEmail, this.handleSubmit, error)}
    </div>;
  }
}

const showResetForm = (getFieldDecorator, invalidEmail, handleSubmit, error) => {
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
    <p>{(invalidEmail) ? 'Invalid email' : null}</p>
    <p>{(error) ? `Error making request ${error}` : null}</p>
  </Form>;
};

const showEmailSent = (emailAddress) => {
  return <div className='emailSent'>
    <Title level={1}>Salsa Mish admin</Title>
    <Title level={4}>Reset password</Title>
    <p>The email has been sent to: {emailAddress}</p>
  </div>;
};

ResetPasswordForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }),
};

const wrappedResetPasswordForm = Form.create({ name: 'reset-password' })(ResetPasswordForm);
export default (wrappedResetPasswordForm);
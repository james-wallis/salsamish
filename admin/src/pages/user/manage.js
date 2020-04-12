import React from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
import axios from 'axios';
import withLayout from '../../components/withLayout';
import './user.css';

const { Title } = Typography;

class ManageAccount extends React.Component {
  state = {
    credentialError: false,
    changeSuccess: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.put(`/api/user/password`, values)
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
    const { form: { getFieldDecorator }, user: { name, email } } = this.props;
    return <div>
      <Title level={1}>Account overview</Title>
      <Title level={3}>Name: {name}</Title>
      <Title level={3}>Email: {email}</Title>

      <Form id="change-password-form" onSubmit={this.handleSubmit} className="change-password-form">
        <Title level={3}>Change password</Title>
        {
          (changeSuccess)
            ? <p>Password changed successfully</p>
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

const wrappedLoginForm = Form.create({ name: 'manage' })(ManageAccount);
export default withLayout(wrappedLoginForm);
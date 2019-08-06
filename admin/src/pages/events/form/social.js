import React from 'react';
import { Form, Input } from 'antd';

class Social extends React.Component {
  render() {
    const { getFieldDecorator, handleChange, values } = this.props;
    return <div>
      <Form.Item style={{ width: 400 }} label="Facebook link">
        {getFieldDecorator('facebook', {
          initialValue: (values.facebook !== '') ? values.facebook : '',
        })(<Input onChange={(e) => handleChange(e, 'facebook')} />)}
      </Form.Item>
    </div>
  }
}

export default Social;
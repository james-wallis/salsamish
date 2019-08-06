import React from 'react';
import Form from './form/main'; 
import { Typography } from 'antd';

const { Title } = Typography;

class Add extends React.Component {
  render() {
    return <div>
      <Title level={2}>Create Event</Title>
      <Form />
    </div>
  }
}

export default Add;
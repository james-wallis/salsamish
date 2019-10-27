import React from 'react';
import Form from './form/main'; 
import { Typography } from 'antd';
import withLayout from '../../components/withLayout';

const { Title } = Typography;

class Add extends React.Component {
  render() {
    return <div>
      <Title level={2}>Create Event</Title>
      <Form />
    </div>
  }
}

export default withLayout(Add);
import React from 'react';
import { Card } from 'antd';
import { Col } from 'antd';

const { Meta } = Card;
    
function EmployeeCard(props) {
  if (!props.employee) return null;
  const { name, role, image } = props.employee;
  return (
    <Col xs={24} sm={12} md={12} lg={8} xl={6} style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
      <Card
        style={{ width: 240 }}
        cover={<img style={{ height: 200, objectFit: 'cover' }} alt={`Source: "${image}"`} src={`/images/employees/${image}`} />}
        >
        <p style={{ fontSize: 20, margin: 0 }}>{name}</p>
        <p style={{ fontSize: 12, margin: 0 }}>{role}</p>
      </Card>
    </Col>
  );
}

export default EmployeeCard;
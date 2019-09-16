import React from 'react';
import { Card } from 'antd';
import { Col } from 'antd';
import moment from 'moment';

const { Meta } = Card;

function EventCard(props) {
  if (!props.event) return null;
  console.log(props.event);
  const { name, type, date, description } = props.event;
  const dateString = (date.start) ? moment(date.start).format("DD/MM/YYYY") : null;
  return (
    <Col xs={24} sm={12} md={12} lg={8} xl={6} style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
      <Card
        style={{ width: 240 }}
        bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Meta
          title={name}
          description={dateString}
          style={{ borderBottom: '1px #eee solid', marginBottom: 10, paddingBottom: 10}}
        />
        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
          <p style={{ margin: 0, textTransform: 'Capitalize' }}>Type: {type.toLowerCase()}</p>
          <p>{description}</p>
        </div>
      </Card>
    </Col>
  );
}

export default EventCard;
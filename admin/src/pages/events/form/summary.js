import React from 'react'; 
import { Row, Col, Typography, Card } from 'antd';
import moment from 'moment';

const { Title } = Typography;

class Summary extends React.Component {
  render() {
    const { values } = this.props;
    console.log(values);
    return <div style={{ marginBottom: 50 }}>
      <Title level={3} style={{ fontSize: 20 }}>Summary</Title>
      <Row>
        <Col xs={12}>
          <Title level={4} style={{ fontSize: 16 }}>Event Name: {values.name}</Title>
          <p>Description: {(values.description) ? values.description : 'No description added'}</p>
          <p>Type: {values.type}</p>
        </Col>
        <Col xs={12}>
          <p>Start date &amp; time: {moment(values.start).format("dddd, MMMM Do YYYY, h:mm a")}</p>
          <p>End date &amp; time: {moment(values.end).format("dddd, MMMM Do YYYY, h:mm a")}</p>
          <p>Facebook link: {(values.facebook) ? <a target="_blank" rel="noopener noreferrer" href={values.facebook}>{values.facebook}</a> : 'No link added'}</p>
        </Col>
      </Row>
      <Row>
        <Title level={4} style={{ fontSize: 16 }}>Event Agenda</Title>
        <p>Total number of items on agenda: {values.agenda.length}</p> 
          {values.agenda.map((item, index) => (
            <Col xs={10} key={`agenda-summary-item-${index}`} style={{ margin: '20px 10px' }}>
              <Card
                cover={
                  <img
                    height={200}
                    style={{ objectFit: 'contain' }}
                    alt={`headshot for ${this.displayEmployee(item.employee)}`}
                    src={`/images/employees/${this.displayEmployeePicture(item.employee)}`}
                  />
                }
              >
                <h5 style={{ fontSize: 15 }}>Agenda item {index + 1}</h5>
                <p>Name: {item.name}</p>
                <p>Description: {(item.description) ? item.description : 'No description added'}</p>
                <p>Type: {item.type}</p>
                {(item.type === 'LESSON') ? <p>Lesson Difficulty: {item.lesson_level}</p> : null}
                <p>Start time &amp; time: {moment(item.start).format("dddd, MMMM Do YYYY, h:mm a")}</p>
                <p>End time &amp; time: {moment(item.end).format("dddd, MMMM Do YYYY, h:mm a")}</p>
                <p>Employee: {this.displayEmployee(item.employee)}</p>
              </Card>
              
            </Col>
          ))}
      </Row>
    </div>
  }
  displayEmployee = (id) => {
    if (!id) return 'No employee given, this is an error.';
    const { values } = this.props;
    const employee = values.employees.find(function ({ _id }) {
      return _id === id;
    });
    return (employee) ? employee.name : null;
  }

  displayEmployeePicture = (id) => {
    if (!id) return 'No employee given, this is an error.';
    const { values } = this.props;
    const employee = values.employees.find(function ({ _id }) {
      return _id === id;
    });
    return (employee) ? employee.image : null;
  }
}

export default Summary;
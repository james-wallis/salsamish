import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Card } from 'antd';
import moment from 'moment';

const { Title } = Typography;

class Summary extends React.Component {
  render() {
    const { values: { name, description, type, start, end, facebook, agenda } } = this.props;
    return <div style={{ marginBottom: 50 }}>
      <Title level={3} style={{ fontSize: 20 }}>Summary</Title>
      <Row>
        <Col xs={12}>
          <Title level={4} style={{ fontSize: 16 }}>Event Name: {name}</Title>
          <p>Description: {(description) ? description : 'No description added'}</p>
          <p>Type: {type}</p>
        </Col>
        <Col xs={12}>
          <p>Start date &amp; time: {moment(start).format('dddd, MMMM Do YYYY, h:mm a')}</p>
          <p>End date &amp; time: {moment(end).format('dddd, MMMM Do YYYY, h:mm a')}</p>
          <p>Facebook link: {(facebook) ? <a target="_blank" rel="noopener noreferrer" href={facebook}>{facebook}</a> : 'No link added'}</p>
        </Col>
      </Row>
      <Row>
        <Title level={4} style={{ fontSize: 16 }}>Event Agenda</Title>
        <p>Total number of items on agenda: {agenda.length}</p> 
          {agenda.map((item, index) => (
            <Col xs={10} key={`agenda-summary-item-${index}`} style={{ margin: '20px 10px' }}>
              <Card
                cover={
                  <img
                    height={200}
                    style={{ objectFit: 'contain' }}
                    alt={`headshot for ${this.displayEmployee(item.employee)}`}
                    src={this.displayEmployeePicture(item.employee)}
                  />
                }
              >
                <h5 style={{ fontSize: 15 }}>Agenda item {index + 1}</h5>
                <p>Name: {item.name}</p>
                <p>Description: {(item.description) ? item.description : 'No description added'}</p>
                <p>Type: {item.type}</p>
                {(item.type === 'LESSON') ? <p>Lesson Difficulty: {item.lesson_level}</p> : null}
                <p>Start time &amp; time: {moment(item.start).format('dddd, MMMM Do YYYY, h:mm a')}</p>
                <p>End time &amp; time: {moment(item.end).format('dddd, MMMM Do YYYY, h:mm a')}</p>
                <p>Team member: {this.displayEmployee(item.employee)}</p>
              </Card>
              
            </Col>
          ))}
      </Row>
    </div>;
  }
  displayEmployee = (emp) => {
    if (!emp) return 'No team member given, this is an error.';
    if (emp._id) {
      return emp.name;
    } else {
      const { values } = this.props;
      const employee = values.employees.find(function ({ _id }) {
        return _id === emp;
      });
      return (employee) ? employee.name : null;
    }
  }

  displayEmployeePicture = (emp) => {
    if (!emp) return 'No team member given, this is an error.';
    if (emp._id) {
      return emp.image;
    } else {
      const { values } = this.props;
      const employee = values.employees.find(function ({ _id }) {
        return _id === emp;
      });
      return (employee) ? employee.image : null;
    }
  }
}

Summary.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired, 
    end: PropTypes.string.isRequired, 
    facebook: PropTypes.string,
    agenda: PropTypes.array.isRequired,
    employees: PropTypes.array.isRequired,
  }),
};

export default Summary;
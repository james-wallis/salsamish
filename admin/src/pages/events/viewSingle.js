import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Row, Col, Button, Popconfirm, message, Icon } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

class ViewAll extends React.Component {
  state = {
    events: [],
    selectedEvent: null
  }

  componentDidMount() {
    axios.get(`/api/events`)
      .then(res => {
        console.log(res.data);
        const events = res.data;
        this.setState({ events });
      })
  }

  eventSelected = value => {
    console.log(`selected ${value}`);
    if (!value || value === '') return;
    const { events } = this.state;
    const event = events.find(x => x._id === value);
    this.setState({ selectedEvent: event });
  }

  deleteEvent = e => {
    const { history } = this.props;
    const { selectedEvent } = this.state;
    axios.delete(`/api/events/${selectedEvent._id}`)
      .then(res => {
        message
          .success(`${selectedEvent.name} has been deleted (Status code ${res.status})`, 1)
          .then(() => message.info('Redirecting to event overview', 1))
          .then(() => history.push('/events/'))
      }).catch(err => {
        if (err.response) {
          message.error(`Error deleting event (Status code ${err.response.status})`);
        } else {
          message.error(`Error deleting event, pre-response, `, err.message)
        }
        console.log(err);
      });
  }

  render() {
    const { events, selectedEvent } = this.state;
    return (
      <div>
        <Row>
          <Col xs={24}>
            <Title level={2}>View event</Title>
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Select an event (use the date or name)"
              optionFilterProp="children"
              onChange={this.eventSelected}
              filterOption={(input, option) => 
                option.props.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {events.map((event, i) => {
                const dateString = (event.date) ? `${moment(event.date.start).format('DD/MM/YY')} - ` : null;
                return <Option value={event._id} key={`option-${i}`}>{dateString}{event.name}</Option>
              })}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            {(selectedEvent) ? information(selectedEvent, this.deleteEvent) : null}
          </Col>
        </Row>
      </div>
    )
  }
}

const information = (event, cb) => {
  console.log(event);
  const description = (event.description) ? formatDescription(event.description) : 'Description: N/A';
  return <div style={{ marginTop: 50 }}>
    <Row>
      <Col xs={15}>
        <Title level={3}>
          {event.name}
          <span style={{ fontWeight: 300, color: 'grey', textTransform: 'capitalize' }}>
            {` (${event.type.toLowerCase()})`}
          </span>
        </Title>
        <p style={{ fontStyle: 'italic', marginBottom: 0 }}>
          From: {moment(event.date.start).format('dddd, MMMM Do YYYY, h:mm A')}
        </p>
        <p style={{ fontStyle: 'italic' }}>
          Until: {moment(event.date.end).format('dddd, MMMM Do YYYY, h:mm A')}
        </p>
        {description}
        <p>
          Facebook link:
          {
            (event.facebook) 
              ? <a href={event.facebook} target='_blank' rel='noopener noreferrer'> {event.facebook}</a>
              : <span> N/A</span>
          }
          
        </p>
      </Col>
    </Row>
    <Row style={{ marginBottom: 20 }}>
      <Col xs={24}>
        <Title level={3}>
          Agenda
        </Title>
      </Col>
      {
        event.agenda.map((e, i) => (
          <Col key={`event-agenda-${i}`} xs={8}>
            <div style={{ backgroundColor: 'white', padding: 10, marginRight: 10 }}>
              <Title level={4}>{e.name}</Title>
              <p style={{ fontStyle: 'italic', marginBottom: 0 }}>
                From: {moment(e.start).format('h:mm A')}
              </p>
              <p style={{ fontStyle: 'italic' }}>
                Until: {moment(e.end).format('h:mm A')}
              </p>
              <p style={{ textDecoration: 'underline', marginBottom: 0 }}>Employee</p>
              <p style={{ textTransform: 'capitalize' }}>{(e.employee) ? e.employee.name : 'N/A'}</p>
              <p style={{ textDecoration: 'underline', marginBottom: 0 }}>Type</p>
              <p style={{ textTransform: 'capitalize' }}>{e.type.toLowerCase()} <span style={{ textTransform: 'capitalize' }}>{(e.lesson_level) ? `(${e.lesson_level.toLowerCase()})` : null}</span></p>
              <p style={{ textDecoration: 'underline', marginBottom: 0 }}>Description</p>
              {(event.description) ? formatDescription(event.description) : <p>N/A</p>}
            </div>
            
          </Col>
        ))
      }
    </Row>
    <Row>
      <Col xs={24}>
        <Title level={3}>Actions</Title>
        <Button style={{ marginRight: 10 }} icon="edit" href={`/events/edit?id=${event._id}`}>Edit</Button>
        <Popconfirm
          placement="bottomLeft"
          title={'Are you sure you want to delete this event?'}
          onConfirm={cb}
          okText="Yes"
          cancelText="No"
          icon={<Icon type="warning" style={{ color: 'red' }} />}
        >
          <Button type="danger" icon="delete">Delete</Button>
        </Popconfirm>
      </Col>
    </Row>
  </div>
}

const formatDescription = unformatted => {
  const desc = unformatted.split('\n');
  return <div>
    {desc.map((text, i) => {
      return (text !== '') ? <p key={`description-${i}`}>{text}</p> : <br key={`description-${i}`} />;
    })}
  </div>
}

export default withRouter(ViewAll);

import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Row, Col, message } from 'antd';
import moment from 'moment';
import ShowEvent from '../../components/showEvent';

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
        const events = res.data;
        this.setState({ events });
      })
  }

  eventSelected = value => {
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
            {(events.length === 0) ? <p>No events in the database.</p> : null}
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            {(selectedEvent) ? <ShowEvent event={selectedEvent} deleteEvent={this.deleteEvent}/> : null}
          </Col>
        </Row>
      </div>
    )
  }
}



export default withRouter(ViewAll);

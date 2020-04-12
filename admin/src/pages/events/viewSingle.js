import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Row, Col, message } from 'antd';
import moment from 'moment';
import ShowEvent from '../../components/showEvent';
import withLayout from '../../components/withLayout';

const { Title } = Typography;
const { Option } = Select;

class ViewSingle extends React.Component {
  state = {
    events: [],
    selectedEvent: null
  }

  componentDidMount() {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    axios.get(`/api/events`)
      .then(res => {
        const events = res.data;
        events.sort(compareDates);
        this.setState({ events });
        if (id) this.eventSelected(id);
      })
  }

  eventSelected = value => {
    if (!value || value === '') return;
    const { events } = this.state;
    const { history, location } = this.props;
    const event = events.find(x => x._id === value);
    if (!event) return;
    this.setState({ selectedEvent: event });
    const params = new URLSearchParams(location.search);
    if (event._id !== params.get('id')) {
      history.replace({
        search: `?id=${event._id}`
      })
    }
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
    const value = (selectedEvent && selectedEvent._id) ? selectedEvent._id : undefined;
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
              value={value}
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

const compareDates = (firstEvent, secondEvent) => {
  const first = moment(firstEvent.date.start);
  const second = moment(secondEvent.date.start);
  if (first < second) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

export default withLayout(withRouter(ViewSingle));

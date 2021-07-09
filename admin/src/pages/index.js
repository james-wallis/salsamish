import React from 'react';
import axios from 'axios';
import { Typography, message } from 'antd';
import ShowEvent from '../components/showEvent';
import withLayout from '../components/withLayout';

const { Title } = Typography;

class Index extends React.Component {
  state = {
    event: null,
  }

  deleteEvent = () => {
    const { event } = this.state;
    axios.delete(`/api/events/${event._id}`)
      .then(res => {
        message
          .success(`${event.name} has been deleted (Status code ${res.status})`, 1)
          .then(() => message.info('Updating next event', 1))
          .then(() => this.getNextEvent());
      }).catch(err => {
        if (err.response) {
          message.error(`Error deleting event (Status code ${err.response.status})`);
        } else {
          message.error('Error deleting event, pre-response, ', err.message);
        }
      });
  }

  componentDidMount() {
    this.getNextEvent();
  }

  getNextEvent() {
    const now = new Date();
    axios.get(`/api/events/next/${now.toISOString()}`)
      .then(res => {
        if (!res.data.startsWith('<!doctype')) {
          const event = res.data;
          this.setState({ event });
        }
      });
  }

  render() {
    const { event } = this.state;
    const errorText = (event === null) ? 'Fetching next event' : 'No upcoming events in the calendar';
    return <div>
      <Title level={2}>Next Event</Title>
      {(event) 
        ? <ShowEvent event={event} deleteEvent={this.deleteEvent} />
        : <p>{errorText}</p>
      }
    </div>;
  }
}

export default withLayout(Index);
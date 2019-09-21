import React from 'react';
import axios from 'axios';
import { Typography, message } from 'antd';
import ShowEvent from '../components/showEvent';

const { Title } = Typography;

class Index extends React.Component {
  state = {
    event: null
  }

  deleteEvent = e => {
    const { event } = this.state;
    axios.delete(`/api/events/${event._id}`)
      .then(res => {
        message
          .success(`${event.name} has been deleted (Status code ${res.status})`, 1)
          .then(() => message.info('Updating next event', 1))
          .then(() => this.getNextEvent())
      }).catch(err => {
        if (err.response) {
          message.error(`Error deleting event (Status code ${err.response.status})`);
        } else {
          message.error(`Error deleting event, pre-response, `, err.message)
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
        const event = res.data;
        this.setState({ event });
      })
  }

  render() {
    const { event } = this.state;
    return <div>
      <Title level={2}>Next Event</Title>
      {(event) 
        ? <ShowEvent event={event} deleteEvent={this.deleteEvent} />
        : <p>Fetching next event</p>
      }
    </div>
  }
}

export default Index;
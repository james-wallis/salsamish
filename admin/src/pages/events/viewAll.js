import React from 'react';
import axios from 'axios';
import EmployeeCard from '../../components/eventCard';
import withLayout from '../../components/withLayout';

class ViewAll extends React.Component {
  state = {
    events: [],
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => {
        const events = res.data;        
        this.setState({ events });
      });
  }

  render() {
    const { events } = this.state;
    return <div>
      {events.map((event, i) => {
        return (
          <EmployeeCard key={`employee-card-${i}`} event={event} />
        );
      })}
      {(events.length === 0) ? <p>No events in the database.</p> : null}
    </div>;
  }
}

export default withLayout(ViewAll);
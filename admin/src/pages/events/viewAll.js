import React from 'react';
import axios from 'axios';
import EmployeeCard from '../../components/eventCard';

class ViewAll extends React.Component {
  state = {
    events: []
  }

  componentDidMount() {
    axios.get(`/api/events`)
      .then(res => {
        console.log(res.data);
        const events = res.data;
        this.setState({ events });
      })
  }

  render() {
    const { events } = this.state;
    return <div>
      {events.map((event, i) => {
        return (
          <EmployeeCard key={`employee-card-${i}`} event={event} />
        )
      })}
      
    </div>
  }
}

export default ViewAll;
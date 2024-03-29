import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from './form/main';
import { Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import withLayout from '../../components/withLayout';

const { Title } = Typography;

class Edit extends React.Component {
  state = {
    event: null,
  }
  componentDidMount() {
    const { location: { search } } = this.props;
    let params = new URLSearchParams(search);
    axios.get(`/api/events/${params.get('id')}`)
      .then(res => {
        const event = res.data;
        // Add .end and .start into the event for the date
        event.end = res.data.date.end;
        event.start = res.data.date.start;
        this.setState({ event });
      });
  }

  render() {
    const { event } = this.state;
    return <div>
      <Title level={2}>Edit Event</Title>
      {(event) 
        ? <Form event={event} edit/>
        : <p>Fetching event</p>}
      
    </div>;
  }
}

Edit.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

export default withLayout(withRouter(Edit));
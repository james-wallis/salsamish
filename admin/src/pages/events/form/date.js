import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, DatePicker, message } from 'antd';
import moment from 'moment';

moment.locale('en');
const { RangePicker } = DatePicker;

class Date extends React.Component {
  state = {
    start: this.props.values.start,
    end: this.props.values.end,
  }

  render() {
    const { values } = this.props;
    const { start, end } = this.state;
    return <div>
      {(values.type === 'FRIDAY') ? this.friday() : this.custom() }
      <Row>
        <Col xs={18}>
          <Row>
            <Col xs={11}>
              <p style={{ fontWeight: 600, fontSize: 16 }}>Start</p>
            </Col>
            <Col xs={12} offset={1}>
              <p style={{ fontWeight: 600, fontSize: 16 }}>End</p>
            </Col>
          </Row>
          <Row>
            <Col xs={11}>
              <p>{(start) ? moment(start).format('dddd, MMMM Do YYYY, h:mm a') : 'The start date will appear here once you have selected it.'}</p>
            </Col>
            <Col xs={12} offset={1}>
              <p>{(end) ? moment(end).format('dddd, MMMM Do YYYY, h:mm a') : 'The end date will appear here once you have selected it.'}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>;
  }
  
  custom = () => {
    const { getFieldDecorator, values } = this.props;
    const startDate = (values.start) ? moment(values.start) : null;
    const endDate = (values.end) ? moment(values.end) : null;
    const rangeConfig = {
      initialValue: [startDate, endDate],
      rules: [{ type: 'array', required: true, message: 'Please select date and time' }],
    };
    return <Form.Item label="Date and time">
      {getFieldDecorator('range-time-picker', rangeConfig)(
        <RangePicker onChange={this.changeCustom} showTime={{ hideDisabledOptions: true, format: 'HH:mm', minuteStep: 5 }} format="DD-MM-YYYY HH:mm" />,
      )}
    </Form.Item>;
  }

  friday = () => {
    const { getFieldDecorator, values } = this.props;
    const startDate = (values.start) ? moment(values.start) : null;
    const config = {
      initialValue: startDate,
      rules: [{ type: 'object', required: true, message: 'Please select date' }],
    };
    return <Form.Item label="Date">
      {getFieldDecorator('date-picker', config)(
        <DatePicker onChange={this.changeFriday} format={'DD-MM-YYYY'} />
      )}
    </Form.Item>;
  }

  changeCustom = arr => {
    if (!arr || !arr[0] || !arr[1]) return this.updateValues(null, null);
    const [start, end] = arr;
    this.updateValues(start, end);
  }

  changeFriday = start => {
    if (!start) return this.updateValues(null, null);
    start.set({
      hour: '19',
      minute: '30',
      second: '00',
    });
    const end = moment(start.toISOString());
    end.add(1, 'days').seconds(0).minutes(0).hours(1);
    this.updateValues(start, end);
    // Feedback if the chosen day isn't a Friday
    if (start.day() !== 5) message.warning('The chosen date is not a Friday', 4);
  }

  updateValues = (start, end) => {
    const { handleChange, resetValue } = this.props;
    this.setState({
      start: (start) ? start.toISOString() : null,
      end: (end) ? end.toISOString() : null,
    });
    (start) ? handleChange(start.toISOString(), 'start') : resetValue('start');
    (end) ? handleChange(end.toISOString(), 'end') : resetValue('end');
  }
}

Date.propTypes = {
  values: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    type: PropTypes.string.isRequired,
  }),
  form: PropTypes.shape({
    setFields: PropTypes.func.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
  resetValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
};

export default Date;
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Icon, Button, Steps, message } from 'antd';
import axios from 'axios';

import Agenda from './agenda';
import Date from './date';
import Information from './information';
import Social from './social';
import Summary from './summary';

const ButtonGroup = Button.Group;
const { Step } = Steps;
const defaultFridayName = 'Salsa Mish Friday';

const initialState = {
  currentStep: 0,
  name: defaultFridayName,
  description: null,
  type: 'FRIDAY',
  start: null,
  end: null,
  facebook: null,
  agenda: null,
  employees: [],
};

class Main extends React.Component {
  state = {...initialState};

  componentDidMount() {
    const { event } = this.props;
    for (const key in event) {
      if (Object.prototype.hasOwnProperty.call(event, key)) {
        this.setState({
          [key]: event[key],
        });
      }
    }
    axios.get('/api/employees')
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = (e, name) => {
    const value = (e.target) ? e.target.value : e;
    if (name === 'type' && value !== 'FRIDAY' && this.state.name === defaultFridayName) this.setState({ name: null });
    this.setState({
      [name]: value,
    });
    return value;
  }

  resetValue = name => {
    this.setState({
      [name]: initialState[name],
    });
    return initialState[name];
  }

  _next = () => {
    const { currentStep } = this.state;
    const { form: { validateFields } } = this.props;
    validateFields((err) => {
      if (err) {
        ensureValid(err);
      } else {
        this.setState({
          currentStep: currentStep + 1,
        });
      }
    });
  }

  _previous = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  }

  submit = () => {
    const { edit: isEdit } = this.props;
    if (isEdit) {
      this.submitEdit();
    } else {
      this.submitNew();
    }
  }

  submitNew = () => {
    const { history } = this.props;
    const values = {...this.state};
    delete values.currentStep;
    delete values.employees;
    axios.post('/api/events', values, { 
    }).then(res => {
      const { id } = res.data;
      message.success(`${values.name} has been successfully added (Status code ${res.status}).`)
        .then(() => history.push(`/events/view?id=${id}`));
    }).catch(showServerMessageOnError);
  }

  submitEdit = () => {
    const { history } = this.props;
    const values = { ...this.state };
    delete values.currentStep;
    delete values.employees;
    if (!values._id) {
      message.error(`Error updating ${values.name} as no ID is present`);
    } else {
      axios.put(`/api/events/${values._id}`, values, {
      }).then(res => {
        message.success(`${values.name} has been successfully modified (Status code ${res.status}).`)
          .then(() => history.push(`/events/view?id=${values._id}`));
      }).catch(showServerMessageOnError);
    }
  }

  render() {
    const { currentStep } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const childProps = {
      getFieldDecorator,
      form,
      handleChange: this.handleChange,
      values: this.state,
      resetValue: this.resetValue,
    };
    return <div>
      <Row>
        <Col xs={18}>
          <Form onSubmit={this.handleSubmit}>
            {(currentStep === 0) ? <Information {...childProps} /> : null}
            {(currentStep === 1) ? <Date {...childProps} /> : null}
            {(currentStep === 2) ? <Social {...childProps} /> : null}
            {(currentStep === 3) ? <Agenda {...childProps} /> : null}
            {(currentStep === 4) ? <Summary {...childProps} /> : null}
          </Form>
        </Col>
        <Col xs={5} offset={1}>
          <Steps direction="vertical" current={currentStep}>
            <Step title="Information" description="Type of event, name and description." />
            <Step title="Date" description="Start and end date of the event." />
            <Step title="Social" description="Add social links for the event." />
            <Step title="Agenda" description="Add items to the event's agenda." />
            <Step title="Summary" description="Event summary." />
          </Steps>
        </Col>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Col xs={24}>
          <ButtonGroup>
            {(currentStep !== 0) ? <Button type="primary" onClick={this._previous}>
              <Icon type="left" />
              Previous
            </Button> : null}
            {(currentStep !== 4) ? <Button type="primary" onClick={this._next}>
              Next
              <Icon type="right" />
            </Button> : null}
            {(currentStep === 4) ? <Button type="danger" onClick={this.submit}>
              Submit event
              <Icon type="check" />
            </Button> : null}
          </ButtonGroup>
        </Col>
      </Row>
    </div>;
  }
}

const showServerMessageOnError = (err) => {
  const { response: { status } } = err;
  switch (status) {
    case 400:
      message.error('Error: The data sent contains an invalid type (Status code 400)');
      break;
    case 404:
      message.error('Error: The form is missing data (Status code 404)');
      break;
    case 500:
      message.error('Error: An error has occured on the server (Status code 500)');
      break;
    default:
      message.error(`Error: An unknown error has occured (Status code ${status})`);
      break;
  }
};

const ensureValid = (errors) => {
  for (const field in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, field)) {
      message.error(`Field ${field} missing`);
      // Only show first error
      return;
    }
  }
};

Main.propTypes = {
  event: PropTypes.object,
  edit: PropTypes.bool,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const WrappedNormalLoginForm = Form.create({ name: 'event' })(Main);

export default withRouter(WrappedNormalLoginForm);
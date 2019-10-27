import React from 'react';
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
  employees: []
}

class Main extends React.Component {
  state = {...initialState};

  componentDidMount() {
    const e = this.props.event;
    for (const key in e) {
      if (e.hasOwnProperty(key)) {
        this.setState({
          [key]: e[key]
        })
      }
    }
    axios.get(`/api/employees`)
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
      })
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = (e, name) => {
    const value = (e.target) ? e.target.value : e;
    console.log('handle change')
    console.log(name, value);
    if (name === 'type' && value !== 'FRIDAY' && this.state.name === defaultFridayName) this.setState({ name: null });
    this.setState({
      [name]: value
    })
    console.log(this.state);
    return value;
  }

  resetValue = name => {
    this.setState({
      [name]: initialState[name]
    })
    return initialState[name];
  }

  _next = () => {
    const { currentStep } = this.state;
    const { form: { validateFields }, } = this.props;
    validateFields((err) => {
      if (err) {
        ensureValid(err);
      } else {
        this.setState({
          currentStep: currentStep + 1
        })
      }
    })
  }

  _previous = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1
    })
  }

  submit = () => {
    const { edit } = this.props;
    if (edit) {
      this.submitEdit();
    } else {
      this.submitNew();
    }
  }

  submitNew = () => {
    const values = {...this.state}
    delete values.currentStep;
    delete values.employees;
    axios.post('/api/events', values, { 
    }).then(res => {
      message.success(`${values.name} has been successfully added (Status code ${res.status}).`)
    }).catch(showServerMessageOnError)
  }

  submitEdit = () => {
    const values = { ...this.state }
    delete values.currentStep;
    delete values.employees;
    if (!values._id) {
      message.error(`Error updating ${values.name} as no ID is present`);
    } else {
      axios.put(`/api/events/${values._id}`, values, {
      }).then(res => {
        message.success(`${values.name} has been successfully modified (Status code ${res.status}).`)
      }).catch(showServerMessageOnError)
    }
  }

  render() {
    console.log(this.state);
    const { currentStep } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const childProps = {
      getFieldDecorator,
      form,
      handleChange: this.handleChange,
      values: this.state,
      resetValue: this.resetValue,
    }
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
    </div>
  }
}

const showServerMessageOnError = (err) => {
  switch (err.response.status) {
    case 400:
      console.log('400, invalid role');
      message.error('Error: The data sent contains an invalid type (Status code 400)');
      break;
    case 404:
      console.log('404, missing field');
      message.error('Error: The form is missing data (Status code 404)');
      break;
    case 500:
      console.log('500, server error');
      message.error('Error: An error has occured on the server (Status code 500)');
      break;
    default:
      console.log(err.response.status + ', unknown error');
      console.log(err)
      message.error('Error: An unknown error has occured (Status code ' + err.response.status + ')');
      break;
  }
}

const ensureValid = (errors) => {
  for (const field in errors) {
    if (errors.hasOwnProperty(field)) {
      message.error(`Field ${field} missing`);
      // Only show first error
      return;
    }
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'event' })(Main);

export default WrappedNormalLoginForm;
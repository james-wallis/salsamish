import React from 'react';
import axios from 'axios';
import { Row, Col, Form, Icon, Button, Steps, Typography } from 'antd';

import Agenda from './agenda';
import Date from './date';
import Information from './information';
import Social from './social';
import Summary from './summary';

const ButtonGroup = Button.Group;
const { Step } = Steps;
const defaultFridayName = 'This Friday at Salsa Mish';

const initialState = {
  currentStep: 3,
  name: defaultFridayName,
  description: null,
  type: 'FRIDAY',
  start: null,
  end: null,
  facebook: null

}

class Main extends React.Component {
  state = {...initialState};

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
    console.log('next');
    console.log(this.state);
    this.props.form.validateFields((err, values) => {
      if (!err) this.setState({
        currentStep: currentStep + 1
      })
    })
  }

  _previous = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1
    })
  }

  render() {
    const { currentStep } = this.state;
    const { getFieldDecorator } = this.props.form;
    const childProps = {
      getFieldDecorator,
      handleChange: this.handleChange,
      values: this.state,
      resetValue: this.resetValue
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
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'event' })(Main);

export default WrappedNormalLoginForm;
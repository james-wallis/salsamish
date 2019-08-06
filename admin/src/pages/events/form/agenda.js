import React from 'react';
import { Tabs, Button, Form, Row, Col, Input, Radio, TimePicker, Select } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;
const { TextArea } = Input;

const FridayPreset = [
  { name: 'New Item' }
]

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;

    this.state = {
      activeKey: 0,
      agenda: (this.props.values.type === 'FRIDAY') ? FridayPreset : []
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { agenda } = this.state;
    agenda.push({ name: 'New Item' });
    this.setState({ agenda, activeKey: (agenda.length-1) });
  };

  remove = targetKey => {
    let { activeKey, agenda } = this.state;
    activeKey = (targetKey > 0) ? targetKey-1 : targetKey;
    agenda.splice(targetKey, 1);
    this.setState({ agenda, activeKey });
  };

  render() {
    const { agenda } = this.state;
    return (
      <div>
        <p>There are currently {agenda.length} items on the agenda for this event.</p>
        <div className="card-container">
          {(agenda.length > 0)
            ? <Tabs
              onChange={this.onChange}
              activeKey={`${this.state.activeKey}`}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {agenda.map((item, index) => (
                <TabPane tab={item.name} key={index}>
                  {this.item()}
                </TabPane>
              ))}
            </Tabs> :
            <div style={{ marginTop: 0 }}>
              <p>Use the button below to add the first item.</p>
              <Button type="primary" onClick={this.add}>Add an item</Button>
            </div>}
        </div>
      </div>
    );
  }

  item = (index) => {
    const { getFieldDecorator, values } = this.props;
    const handleChange = () => {
      console.log('change');
    }
    return <Row>
      <Col xs={11}>
        <Form.Item label="Name">
          {getFieldDecorator('item-name', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input the event name' }],
          })(<Input onChange={(e) => handleChange(e, 'name')} />)}
        </Form.Item>

       

        <Form.Item label="Description (Optional)" >
          {getFieldDecorator('item-description', {
            initialValue: '',
          })(
            <TextArea placeholder="Description" rows={9} onChange={(e) => handleChange(e, 'description')} />,
          )}
        </Form.Item>
      </Col>
      <Col xs={11} offset={2}>
        <Row>
          <Col xs={24}>
            <Form.Item label="Type">
              {getFieldDecorator('item-type', {
                initialValue: '',
                rules: [{ required: true, message: 'Please select the item type' }],
              })(
                <Radio.Group onChange={(e) => handleChange(e, 'type')}>
                  <Radio.Button value="LESSON">Lesson</Radio.Button>
                  <Radio.Button value="DJSET">DJ Set</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Item label="Start time">
              {getFieldDecorator('item-start-time', {
                rules: [{ required: true, message: 'Please select the item start time' }],
              })(
                <TimePicker minuteStep={5} format={'HH:mm'} />
              )}
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="End time">
              {getFieldDecorator('item-end-time', {
                rules: [{ required: true, message: 'Please select the item end time' }],
              })(
                <TimePicker minuteStep={5} format={'HH:mm'} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item label="Assign employee">
              {getFieldDecorator('item-employee', {
                rules: [{ required: true, message: 'Please select the employee to assign to this item' }],
              })(
                <Select
                  showSearch
                  placeholder="Select an employee"
                  optionFilterProp="children"
                  onChange={this.employeeSelected}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {employees.map((emp, i) => {
                    return <Option value={emp._id} key={`option-${i}`}>{emp.name}</Option>
                  })} */}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Col>

    </Row>
  }
}

export default Agenda;
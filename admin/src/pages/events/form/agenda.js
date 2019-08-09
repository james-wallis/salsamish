import React from 'react';
import { Tabs, Button, Form, Row, Col, Input, Radio, TimePicker, Select } from 'antd';
import moment from 'moment';
import presets from './presets';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
      agenda: this.setAgenda(this.props.values),
    };
  }

  setAgenda(values) {
    console.log(values);
    if (values.agenda && values.agenda.length !== 0) return values.agenda;
    switch (values.type) {
      case 'FRIDAY':
        return presets.friday(values.start)
      default:
        return []
    }
  }

  changeTab = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { agenda } = this.state;
    agenda.push({
      name: 'New Item',
      description: null,
      type: null,
      lesson_level: null,
      start: null,
      end: null,
      employee: null
    });
    this.setState({ agenda, activeKey: (agenda.length-1) });
  };

  remove = targetKey => {
    let { activeKey, agenda } = this.state;
    activeKey = (activeKey >= targetKey && parseInt(activeKey) !== 0) ? activeKey-1 : activeKey;
    agenda.splice(targetKey, 1);
    this.setState({ agenda, activeKey }, this.updateScreen);
  };

  updateScreen = () => {
    const { form } = this.props;
    const { agenda } = this.state;
    console.log(agenda);
    for (let i = 0; i < agenda.length; i++) {
      form.setFields({
        [`item-name-${i}`]: { value: agenda[i].name },
        [`item-description-${i}`]: { value: agenda[i].description },
        [`item-type-${i}`]: { value: agenda[i].type },
        [`item-start-time-${i}`]: { value: (agenda[i].start) ? moment(agenda[i].start) : null },
        [`item-end-time-${i}`]: { value: (agenda[i].end) ? moment(agenda[i].end) : null },
        [`item-employee-${i}`]: { value: agenda[i].employee },
      });
    }
  }

  handleItemChange = (value, name, index) => {
    const { agenda } = this.state;
    const { handleChange } = this.props;
    agenda[index][name] = value;
    // Remove lesson level if the type switches to DJSET
    if (name === 'type' && value === 'DJSET') agenda[index]['lesson_level'] = null;
    this.setState({
      agenda
    })
    handleChange(agenda, 'agenda');
    console.log(this.state)
  }

  render() {
    const { agenda } = this.state;
    return (
      <div>
        <p>There are currently {agenda.length} items on the agenda for this event.</p>
        <div className="card-container">
          {(agenda.length > 0)
            ? <Tabs
              onChange={this.changeTab}
              activeKey={`${this.state.activeKey}`}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {agenda.map((item, index) => (
                <TabPane tab={this.itemTabName(item)} key={index}>
                  {this.item(item, index)}
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

  itemTabName = item => {
    let requiredFieldMissing = !(item.name && item.type && item.start && item.end && item.employee);
    if (item.type === 'LESSON' && (!item.lesson_level || item.lesson_level === '')) requiredFieldMissing = true;
    const asterisk = (requiredFieldMissing) ? <span style={{ color: '#f5222d' }}>*</span> : '';
    const name = (item.name.length > 12) ? (`${item.name.substring(0, 12)}...`) : item.name;
    return <span>{asterisk}{name}</span>
  }

  item = (properties, index) => {
    const { getFieldDecorator, values } = this.props;
    return <Row>
      <Col xs={11}>
        <Form.Item label="Name">
          {getFieldDecorator(`item-name-${index}`, {
            initialValue: (properties.name) ? properties.name : '',
            rules: [{ required: true, message: 'Please input the event name' }],
          })(<Input index={index} onChange={(e) => this.handleItemChange(e.target.value, 'name', index)} />)}
        </Form.Item>

        <Form.Item label="Description (Optional)" >
          {getFieldDecorator(`item-description-${index}`, {
            initialValue: (properties.description) ? properties.description : '',
          })(
            <TextArea placeholder="Description" rows={9} onChange={(e) => this.handleItemChange(e.target.value, 'description', index)} />,
          )}
        </Form.Item>
      </Col>
      <Col xs={11} offset={2}>
        <Row>
          <Col xs={24}>
            <Form.Item label="Type">
              {getFieldDecorator(`item-type-${index}`, {
                initialValue: (properties.type) ? properties.type : '',
                rules: [{ required: true, message: 'Please select the item type' }],
              })(
                <Radio.Group onChange={(e) => this.handleItemChange(e.target.value, 'type', index)}>
                  <Radio.Button value="LESSON">Lesson</Radio.Button>
                  <Radio.Button value="DJSET">DJ Set</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        {(properties.type === 'LESSON') ? this.lessonDifficulty(properties.lesson_level, index) : null}
        <Row>
          <Col xs={12}>
            <Form.Item label="Start time">
              {getFieldDecorator(`item-start-time-${index}`, {
                initialValue: (properties.start) ? moment(properties.start) : null,
                rules: [{ required: true, message: 'Please select the item start time' }],
              })(
                <TimePicker minuteStep={5} format={'HH:mm'} onChange={(time) => this.handleItemChange(time.toISOString(), 'start', index)} />
              )}
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="End time">
              {getFieldDecorator(`item-end-time-${index}`, {
                initialValue: (properties.end) ? moment(properties.end) : null,
                rules: [{ required: true, message: 'Please select the item end time' }],
              })(
                <TimePicker minuteStep={5} format={'HH:mm'} onChange={(time) => this.handleItemChange(time.toISOString(), 'end', index)} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item label="Assign employee">
              {getFieldDecorator(`item-employee-${index}`, {
                rules: [{ required: true, message: 'Please select the employee to assign to this item' }],
              })(
                <Select
                  showSearch
                  placeholder="Select an employee"
                  optionFilterProp="children"
                  onChange={(value) => this.handleItemChange(value, 'employee', index)}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {values.employees.map((emp, i) => {
                    return <Option value={emp._id} key={`employee-select-${index}-option-${i}`}>{emp.name}</Option>
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Col>

    </Row>
  }

  lessonDifficulty = (level, index) => {
    const { getFieldDecorator } = this.props;
    return <Row>
      <Col xs={24}>
        <Form.Item label="Level">
          {getFieldDecorator(`item-lesson-level-${index}`, {
            initialValue: (level) ? level : '',
            rules: [{ required: true, message: 'Please select the level of difficulty' }],
          })(
            <Radio.Group onChange={(e) => this.handleItemChange(e.target.value, 'lesson_level', index)}>
              <Radio.Button value="BEGINNERS">Beginners</Radio.Button>
              <Radio.Button value="INTERMEDIATES">Intermediates</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
      </Col>
    </Row>
  }
}

export default Agenda;
import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Row, Col, Button, Popconfirm, message, Icon } from 'antd';

const { Title } = Typography;
const { Option } = Select;
  
class ViewAll extends React.Component {
  state = {
    employees: [],
    selectedEmployee: null
  }

  componentDidMount() {
    axios.get(`/api/employees`)
      .then(res => {
        console.log(res.data);
        const employees = res.data;
        this.setState({ employees });
      })
  }

  employeeSelected = value => {
    console.log(`selected ${value}`);
    if (!value || value === '') return;
    const { employees } = this.state;
    const emp = employees.find(x => x._id === value);
    this.setState({ selectedEmployee: emp });
  }

  deleteEmployee = e => {
    const { history } = this.props;
    const { selectedEmployee } = this.state;
    axios.delete(`/api/employees/${selectedEmployee._id}`)
      .then(res => {
        message
          .success(`${selectedEmployee.name} has been deleted (Status code ${res.status})`, 1)
          .then(() => message.info('Redirecting to employee overview', 1))
          .then(() => history.push('/employees/'))
      }).catch(err => {
        if (err.response) {
          message.error(`Error deleting employee (Status code ${err.response.status})`);
        } else {
          message.error(`Error deleting employee, pre-response, `, err.message)
        }
        console.log(err);
      });
  }

  render() {
    const { employees, selectedEmployee } = this.state;
    return (
      <div>
        <Row>
          <Col xs={24}>
            <Title level={2}>View employee</Title>
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Select an employee"
              optionFilterProp="children"
              onChange={this.employeeSelected}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {employees.map((emp, i) => {
                return <Option value={emp._id} key={`option-${i}`}>{emp.name}</Option>
              })}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            {(selectedEmployee) ? information(selectedEmployee, this.deleteEmployee) : null}
          </Col>
        </Row>
      </div>
    )
  }
}

const information = (employee, cb) => {
  const description = formatDescription(employee.description);
  return <div style={{ marginTop: 50 }}>
    <Row>
      <Col xs={15}>
        <Title level={3}>{employee.name}</Title>
        <p style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>
          {((employee.role === 'TEACHER') ? 'Teacher' : employee.role)
          + ' - ' +
          ((employee.stylesOfMusic) 
            ? employee.stylesOfMusic.join(', ').toLowerCase() 
            : employee.typesOfDance.join(', ').toLowerCase())
          }
        </p>
        {description}
      </Col>
      <Col xs={8} offset={1}>
        <img style={{ height: 200 }} alt={`Source: "${employee.image}"`} src={`/images/employees/${employee.image}`} />
      </Col>
    </Row>
    <Row>
      <Col xs={24}>
        <Title level={3}>Actions</Title>
        <Button style={{ marginRight: 10 }} icon="edit" disabled>Edit</Button>
        <Popconfirm
          placement="bottomLeft"
          title={'Are you sure you want to delete this employee?'}
          onConfirm={cb}
          okText="Yes"
          cancelText="No"
          icon={<Icon type="warning" style={{ color: 'red' }} />}
        >
          <Button type="danger" icon="delete">Delete</Button>
        </Popconfirm>
      </Col>
    </Row>
  </div>
} 

const formatDescription = unformatted => {
  const desc = unformatted.split('\n');
  return <div>
    {desc.map((text, i) => {
      return (text !== '') ? <p key={`description-${i}`}>{text}</p> : <br key={`description-${i}`} />;
    })}
  </div>
}

export default withRouter(ViewAll);

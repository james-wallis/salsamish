import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Row, Col, Button, Popconfirm, message, Icon } from 'antd';
import withLayout from '../../components/withLayout';

const { Title } = Typography;
const { Option } = Select;
  
class ViewSingle extends React.Component {
  state = {
    employees: [],
    selectedEmployee: null,
  }

  componentDidMount() {
    axios.get('/api/employees')
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
      });
  }

  employeeSelected = value => {
    if (!value || value === '') return;
    const { employees } = this.state;
    const emp = employees.find(x => x._id === value);
    this.setState({ selectedEmployee: emp });
  }

  deleteEmployee = () => {
    const { history } = this.props;
    const { selectedEmployee } = this.state;
    axios.delete(`/api/employees/${selectedEmployee._id}`)
      .then(res => {
        message
          .success(`${selectedEmployee.name} has been deleted (Status code ${res.status})`, 1)
          .then(() => message.info('Redirecting to team member overview', 1))
          .then(() => history.push('/employees/'));
      }).catch(err => {
        if (err.response) {
          message.error(`Error deleting team member (Status code ${err.response.status})`);
        } else {
          message.error('Error deleting team member, pre-response, ', err.message);
        }
      });
  }

  render() {
    const { employees, selectedEmployee } = this.state;
    return (
      <div>
        <Row>
          <Col xs={24}>
            <Title level={2}>View team member</Title>
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Select a team member"
              optionFilterProp="children"
              onChange={this.employeeSelected}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {employees.map((emp, i) => {
                return <Option value={emp._id} key={`option-${i}`}>{emp.name}</Option>;
              })}
            </Select>
            {(employees.length === 0) ? <p>No team members in the database.</p> : null}
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            {(selectedEmployee) ? information(selectedEmployee, this.deleteEmployee) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

const information = (employee, cb) => {
  const { name, description: unformattedDescription, stylesOfMusic, typesOfDance, image, role, urlSafeName } = employee;
  const description = formatDescription(unformattedDescription);
  return <div style={{ marginTop: 50 }}>
    <Row>
      <Col xs={15}>
        <Title level={3}>{name}</Title>
        <p style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>
          {((role === 'TEACHER') ? 'Teacher' : role)
          + ' - ' +
          ((stylesOfMusic)
            ? stylesOfMusic.join(', ').toLowerCase()
            : typesOfDance.join(', ').toLowerCase())
          }
        </p>
        <p>URL will end with: {urlSafeName}</p>
        {description}
      </Col>
      <Col xs={8} offset={1}>
        <img style={{ height: 200 }} alt={`Source: "${image}"`} src={image} />
      </Col>
    </Row>
    <Row>
      <Col xs={24}>
        <Title level={3}>Actions</Title>
        <Button style={{ marginRight: 10 }} icon="edit" disabled>Edit</Button>
        <Popconfirm
          placement="bottomLeft"
          title={'Are you sure you want to delete this team member?'}
          onConfirm={cb}
          okText="Yes"
          cancelText="No"
          icon={<Icon type="warning" style={{ color: 'red' }} />}
        >
          <Button type="danger" icon="delete">Delete</Button>
        </Popconfirm>
      </Col>
    </Row>
  </div>;
}; 

const formatDescription = unformatted => {
  const desc = unformatted.split('\n');
  return <div>
    {desc.map((text, i) => {
      return (text !== '') ? <p key={`description-${i}`}>{text}</p> : <br key={`description-${i}`} />;
    })}
  </div>;
};

ViewSingle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withLayout(withRouter(ViewSingle));

import React from 'react';
import axios from 'axios';
import EmployeeCard from '../../components/employeeCard';
import withLayout from '../../components/withLayout';

class ViewAll extends React.Component {
  state = {
    employees: []
  }

  componentDidMount() {
    axios.get(`/api/employees`)
      .then(res => {
        const { data: employees } = res;
        this.setState({ employees });
      })
  }

  render() {
    const { employees } = this.state;
    return (
      <ul>
        {employees.map((employee, index) => <EmployeeCard employee={employee} key={`employee-card-${index}`} />)}
        {(employees.length === 0) ? <p>No team members in the database.</p> : null}
      </ul>
    )
  }
}

export default withLayout(ViewAll);

import React from 'react';
import axios from 'axios';
import EmployeeCard from '../../components/employeeCard'



class ViewAll extends React.Component {
  state = {
    employees: []
  }

  componentDidMount() {
    axios.get(`/api/employees`)
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
      })
  }

  render() {
    const { employees } = this.state;
    const splitArray = [];
    while (employees.length > 0)
      splitArray.push(employees.splice(0, 3));
    return (
      <ul>
        {splitArray.map((employee, index) => {
          return (
            <div gutter={10} key={index}>
              <EmployeeCard employee={employee[0]} />
              <EmployeeCard employee={employee[1]} />
              <EmployeeCard employee={employee[2]} />
            </div>
          )
        })}
        {(splitArray.length === 0) ? <p>No employees in the database.</p> : null}
      </ul>
    )
  }
}

export default ViewAll;

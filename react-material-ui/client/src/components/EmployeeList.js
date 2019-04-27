import React, { Component } from 'react'
import { graphql} from 'react-apollo';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Employee from '../components/Employee'

import { getSkillsQuery } from '../queries/queries';



class EmployeeList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            searchString: '',
            searchString2: '',
            searchMode: '',
            selected: null
        }
        this.getEmployees()
    }




    getEmployees = () => {

        var tempList = [];
        var data = this.props.data;
        this.setState({ employees: tempList })



        if (data.loading) {

            return (<div>Loading Employees...</div>);
        } else {
            console.log('inside else' + data.length)

            var myArray = data.skills;


            for (var i = 0; i < myArray.length; i++) {
                console.log(myArray[i]);
                var employees = myArray[i].employees;
                for (var j = 0; j < employees.length; j++) {
                    if (employees[j]) {
                        if (this.state.searchMode === 'Job') {
                            if (String(myArray[i].name).toUpperCase().startsWith(this.state.searchString2.trim().toUpperCase()))
                                tempList.push(employees[j]);
                        }
                        else {
                            if (String(employees[j].name).toUpperCase().startsWith(this.state.searchString.trim().toUpperCase()))
                                tempList.push(employees[j]);
                        }

                    }
                }

                //Do something
            }

            this.setState({ employees: tempList })
        }

    }


    onProfileInputChange = (event) => {
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
            this.setState({ searchMode: 'Profile' })

        }
        this.getEmployees()
    }

    onSkillInputChange = (event2) => {
        if (event2.target.value) {
            this.setState({ searchString2: event2.target.value })
        } else {
            this.setState({ searchString2: '' })
            this.setState({ searchMode: 'Job' })

        }
        this.getEmployees()
    }



    render() {
        return (
            <div>
                <div className="divider" />

                <TextField id="searchInput"
                    placeholder="Name based Search"
                    margin="normal"
                    onChange={this.onProfileInputChange} style={{ float: 'left' }} />

                <TextField id="searchInput2"
                    placeholder="Skill Based Search"
                    margin="normal"
                    onChange={this.onSkillInputChange} style={{ float: 'right' }} />




                {this.state.employees ? (

                    <div>
                        <Grid container spacing={24} style={{ padding: 24 }}>

                            {this.state.employees.map(currentEmployee => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Employee key={currentEmployee.id} id={currentEmployee.id} employee={currentEmployee} />
                                </Grid>


                            ))}
                        </Grid>



                    </div>
                ) : ""}

            </div>
        )
    }
}
export default graphql(getSkillsQuery)(EmployeeList);




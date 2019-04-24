import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import SkillList from '../components/SkillList'
import AddEmployee from '../components/AddEmployee'
import EditEmployee from '../components/EditEmployee'

import { deleteEmployeeMutation, getSkillsQuery, updateEmployeeMutation } from '../queries/queries';


class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: props.employee

        };
    }

    deleteProfile(e, param) {
        // use the addEmployeeMutation
        this.props.deleteEmployeeMutation({
            variables: {
                id: param,
                editForm: true
            },
            refetchQueries: [{ query: getSkillsQuery }]
        });
    }





    render() {
        return (
            <div>
                {this.state.employee ? (
                    <Card>
                        <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                            image={this.state.employee.image}
                            title={this.state.employee.name} />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2" >
                                {this.state.employee.name}
                                <Fab href="http://localhost:3000/" aria-label="Delete" style={{ float: 'right' }} onClick={(e) => {
                                    this.deleteProfile(e, this.state.employee.id)
                                }}>
                                    <DeleteIcon />
                                </Fab>
                            </Typography>

                            <Typography gutterBottom component="h3">
                                {this.state.employee.company}
                            </Typography>
                            <SkillList skillId={this.state.employee.id} />
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ flex: 1 }} variant="contained" color="secondary" href={this.state.employee.image} target="_blank">
                                View Profile             
                         </Button>

                            <EditEmployee  employee={this.state.employee} />

                        </CardActions>
                    </Card>
                ) : null}
            </div>
        )
    }

}
//export default Employee

export default compose(
    graphql(getSkillsQuery, { name: "getSkillsQuery" }),
    graphql(updateEmployeeMutation, { name: "updateEmployeeMutation" }),
    graphql(deleteEmployeeMutation, { name: "deleteEmployeeMutation" })
)(Employee);
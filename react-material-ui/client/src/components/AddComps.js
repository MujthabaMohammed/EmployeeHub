import React, { Component } from 'react';

import AddEmployee from '../components/AddEmployee'
import AddSkill from '../components/AddSkill'
import Button from '@material-ui/core/Button'


class AddComps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideEmpForm:false,
            hideSkillForm:false
        };
    }

    handleEmpOpen = () => {
        this.setState({ hideEmpForm: false });
      };

      handleSkillOpen = () => {
        this.setState({ hideSkillForm: false });
      };

    render() {
        return (
            <div>
           <Button variant="contained"  color="primary" onClick={this.handleEmpOpen}>Add Profile</Button>

                <AddEmployee open={this.state.hideEmpForm} />
                <div className="divider" />
                <Button  style={{padding:"24"}} variant="contained" color="primary" onClick={this.handleSkillOpen}>Add Skill</Button>

                <AddSkill open={this.state.hideSkillForm} />

            </div>
        )
    }

}

export default AddComps
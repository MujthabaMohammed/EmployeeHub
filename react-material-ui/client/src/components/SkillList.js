import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getEmployeeQuery } from '../queries/queries';



class SkillList extends Component {
    displaySkillDetails(){
        
        if(this.props.data.loading){

            return( <ul><li>Loading Skills..</li></ul> );
        } else {
            
           return(
                <div>
                   
                             {<ul>
                                <li key={this.props.data.employee.skill.name}>{ this.props.data.employee.skill.name }</li>
                                <li key={this.props.data.employee.skill.category}>{ this.props.data.employee.skill.category }</li>

                                </ul>}
                        
                </div>
            );
        } 
    }
    render(){
        return(
            <div id="book-list">
                { this.displaySkillDetails() }
            </div>
        );
    }
}


//export default graphql(getEmployeeQuery)(SkillList);
export default graphql(getEmployeeQuery, {
    options: (props) => {
        return {
            variables: {
                id: String(props.skillId)
            }
        }
    }
})(SkillList);
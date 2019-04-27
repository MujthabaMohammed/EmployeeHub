import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import EditIcon from '../icons/edit.svg'


import { getSkillsQuery, updateEmployeeMutation, getEmployeeQuery } from '../queries/queries';


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.employee.id,
      name: this.props.employee.name,
      company: this.props.employee.company,
      skillId: this.props.employee.skillId,
      image: this.props.employee.image,
      open: true,
      alert: false,
    };
  }
  displaySkills() {
    var data = this.props.getSkillsQuery;
    if (data.loading) {
      return (<option disabled>Loading Skills</option>);
    } else {
      return data.skills.map(skill => {
        return (<option key={skill.id} value={skill.id}>{skill.name}&nbsp;{skill.category}</option>);
      });
    }
  }



  updateProfile(e) {
    // use the addEmployeeMutation

    e.preventDefault()
    this.props.updateEmployeeMutation({
      variables: {
        id: this.state.id,
        name: this.state.name,
        company: this.state.company,
        skillId: this.state.skillId,
        image: this.state.image
        
      },
      refetchQueries: [{
        query: getSkillsQuery, variables: {
          awaitRefetchQueries: true
        }
      }]
    })

    this.setState({ alert: true , open :true });


  }


  handleClickOpen = () => {
    this.setState({ open: false });
  };

  handleClose = () => {
    this.setState({ open: true });


  };

  handleCloseAlert = () => {
    this.setState({ alert: false });


  };
  render() {
    return (
      <div>

        <Button size="small" style={{ flex: 1 }} variant="contained" color="secondary" onClick={this.handleClickOpen} >
          Edit
                         </Button>
        <form hidden={this.state.open} onSubmit={this.updateProfile.bind(this)} >
          <Typography gutterBottom component="h2" >
            <img src={EditIcon} alt="na" />

          </Typography>
          <div className="field">
            <label>Employee name:</label>
            <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
          </div>
          <div className="field">
            <label>Company:</label>
            <input type="text" value={this.state.company} onChange={(e) => this.setState({ company: e.target.value })} />
          </div>
          <div className="field">
            <label>Image URL:</label>
            <input type="text" value={this.state.image} onChange={(e) => this.setState({ image: e.target.value })} />
          </div>
          <div className="field">
            <label>Skill:</label>
            <select onChange={(e) => this.setState({ skillId: e.target.value })} >
              <option selected={this}>Select Skill</option>
              {this.displaySkills()}
            </select>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>

            <Button variant="contained" onClick={this.handleClose}>Close</Button>
            <div className="divider" />
            <MuiThemeProvider theme={theme} >
              <Button variant="contained" color="primary" type="submit" >
                Update
        </Button>
            </MuiThemeProvider>
          </div>
        </form>



        <Dialog
          aria-labelledby="customized-dialog-title"
          open={this.state.alert}
        >
          <DialogTitle id="customized-dialog-title" >
            Alert
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Profile Successfully Updated
            </Typography>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAlert} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  graphql(getSkillsQuery, { name: "getSkillsQuery" }),
  graphql(updateEmployeeMutation, { name: "updateEmployeeMutation" }),
  graphql(getEmployeeQuery, { name: "getEmployeeQuery" })
  
)(EditEmployee);

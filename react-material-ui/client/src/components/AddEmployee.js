import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


import { getSkillsQuery, addEmployeeMutation } from '../queries/queries';


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      company: '',
      skillId: '',
      image: '',
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
  submitForm(e) {
    //e.preventDefault()
    // use the addEmployeeMutation
    this.props.addEmployeeMutation({
      variables: {
        name: this.state.name,
        company: this.state.company,
        skillId: this.state.skillId,
        image: this.state.image
      },
      refetchQueries: [{ query: getSkillsQuery }]
    });
    this.setState({ alert: true });
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

        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Add Profile</Button>

        <form hidden={this.state.open} onSubmit={this.submitForm.bind(this)} >
          <div className="field">
            <label>Employee name:</label>
            <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
          </div>
          <div className="field">
            <label>Company:</label>
            <input type="text" onChange={(e) => this.setState({ company: e.target.value })} />
          </div>
          <div className="field">
            <label>Image URL:</label>
            <input type="text" onChange={(e) => this.setState({ image: e.target.value })} />
          </div>
          <div className="field">
            <label>Skill:</label>
            <select onChange={(e) => this.setState({ skillId: e.target.value })} >
              <option>Select Skill</option>
              {this.displaySkills()}
            </select>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <MuiThemeProvider theme={theme} >
              <Button variant="contained" color="primary" type="submit" >
                Save
        </Button>
            </MuiThemeProvider>
            <Button variant="contained" onClick={this.handleClose}>Close</Button>
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
              New Profile Successfully Added
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
  graphql(addEmployeeMutation, { name: "addEmployeeMutation" })
)(AddEmployee);

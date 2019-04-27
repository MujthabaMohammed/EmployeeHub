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

import AddSkillIcon from '../icons/addSkill.svg'
import { addSkillMutation, getSkillsQuery } from '../queries/queries';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});


class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      open: true,
      alert: false
    };
  }

  submitForm() {
    //e.preventDefault()
    // use the addEmployeeMutation
    this.props.addSkillMutation({
      variables: {
        name: this.state.name,
        category: this.state.category,
      },
      refetchQueries: [{
        query: getSkillsQuery, variables: {
          awaitRefetchQueries: true
        }
      }]
    });
    this.setState({ alert: true });

  }

  handleClickOpen = () => {
    this.setState({ open: false, name: '', category: '' });
  };

  handleClose = () => {
    this.setState({ open: true });


  };

  handleCloseAlert = () => {
    this.setState({ alert: false });
  }

  render() {
    return (
      <div>



        <Button style={{ padding: "24" }} variant="contained" color="primary" onClick={this.handleClickOpen}>Add Skill</Button>


        <form hidden={this.state.open} id="add-book" onSubmit={this.submitForm.bind(this)} >
          <Typography gutterBottom component="h2" >
            <img src={AddSkillIcon} alt="na" />

          </Typography>
          <div className="field">
            <label>Skill name:</label>
            <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
          </div>
          <div className="field">
            <label>Category:</label>
            <input type="text" value={this.state.category} onChange={(e) => this.setState({ category: e.target.value })} />
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>

            <Button variant="contained" onClick={this.handleClose}>Close</Button>
            <div className="divider" />
            <MuiThemeProvider theme={theme}>
              <Button variant="contained" color="primary" type="submit" >
                Save
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
              New Skill Successfully Added
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
  graphql(addSkillMutation, { name: "addSkillMutation" })
)(AddSkill);


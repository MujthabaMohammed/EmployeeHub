import React, { Component } from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { graphql, compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import AddIcon from '../icons/add.svg'

import { string, url } from 'yup'; // for only what you need



import { getSkillsQuery, addEmployeeMutation } from '../queries/queries';

let Yup = require('yup');

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});


// Defines the validationschema for the form

const validationSchema = Yup.object().shape({
  emp_name: Yup.string().required('Employee Name is required!'),
  image: Yup.string().url('Invalid URL').required('Image is Required'),
  company: Yup.string().required('Company Name is required!'),
  skill : Yup.string().required('Skill Name is required!')
   
})



class AddEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      alert: false
    };
  }


  handleSubmit = (values, {
    props = this.props,
    setSubmitting
  }) => {

    console.log(values);
    //alert('Form Submitted');

    this.props.addEmployeeMutation({
      variables: {
        name: values.emp_name,
        company: values.company,
        skillId: values.skill,
        image: values.image
      },
      refetchQueries: [{
        query: getSkillsQuery, variables: {
          awaitRefetchQueries: true
        }
      }]
    });
    this.setState({ alert: true, open: true });
    setSubmitting(false);
    return;
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


  handleClickOpen = () => {
    this.setState({ open: false, name: '', company: '', image: '' });
  };

  handleClose = () => {
    this.setState({ open: true });


  };

  handleCloseAlert = () => {
    this.setState({ alert: false });


  };
  render() {

    return (
      <Formik
        initialValues={{
          emp_name: '',
          company: '',
          image: '',
          open: true
        }}

        validationSchema={validationSchema}

        /*validate={(values) => {
          let errors = [];

          if (!values.email)
            errors.email = "Email Address Required";
          console.log('See Errors Below' + errors.email);
          //check if my values have errors
          return errors;
        }}*/
        onSubmit={this.handleSubmit}
        render={formProps => {
          return (

            <div>
              <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Add Profile</Button>
              <Form hidden={this.state.open}>
                <Typography gutterBottom component="h2" >
                  <img src={AddIcon} alt="na" />

                </Typography>
                <div>
                <Field
                  type="text"
                  name="emp_name"
                  placeholder="Employee Name"
                />
                <ErrorMessage name="emp_name" />
                </div>
                <div>
                <Field
                  type="text"
                  name="company"
                  placeholder="Company"
                />
                <ErrorMessage name="company" />
                </div>
                <div>
                <Field
                  type="text"
                  name="image"
                  placeholder="Image"
                />
                <ErrorMessage name="image" />
                </div>

                <div>
                <Field
                  name="skill"
                  component="select"
                  placeholder="Your Skill">
                  <option>Select Skill</option>
                  {this.displaySkills()}
                </Field>

                <ErrorMessage name="gender" />

                </div>
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>

                  <Button variant="contained" onClick={this.handleClose}>Close</Button>
                  <div className="divider" />
                  <MuiThemeProvider theme={theme} >
                    <Button variant="contained" color="primary" type="submit" disabled={formProps.isSubmitting}>
                      Save
        </Button>
                  </MuiThemeProvider>
                </div>


              </Form>

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
        }}
      />);


  }
}

export default compose(
  graphql(getSkillsQuery, { name: "getSkillsQuery" }),
  graphql(addEmployeeMutation, { name: "addEmployeeMutation" })
)(AddEmployee);

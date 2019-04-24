import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Home from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton'



import AddSkill from '../components/AddSkill'
import AddEmployee from '../components/AddEmployee'


const NavBar = () => {
    return (
        <div>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Grid
                        justify="space-between" // Add it here :)
                        container
                    >
                        <Grid item>
                            <Grid
                                justify="space-between" // Add it here :)
                                container
                            >
                                <IconButton color="inherit">
                                    <Home />
                                </IconButton>
                                <Typography variant="title" color="inherit">
                                    Employee Hub
                    </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid
                                justify="space-between" // Add it here :)
                                container
                            >
                            
                                <AddEmployee />
                                <div className="divider" />
                                <AddSkill />
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
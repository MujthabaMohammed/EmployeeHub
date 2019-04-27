import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import HomeIcon from '../icons/home.png'


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
                                <img src={HomeIcon} style={{ justifyContent: 'center' }} alt="na" />
                                <div className="divider" />
                                <Typography variant="title" color="inherit" >
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
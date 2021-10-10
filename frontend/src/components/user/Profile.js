import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography';


import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Avatar, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paperr: {
    marginTop: theme.spacing(-1),
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    flexGrow: 1,

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width:250,
    height:250
  }

}));

const Profile = () => {

  const { user, loading } = useSelector(state => state.auth)
  const classes = useStyles();

  return (
    // <Container>
        
    // </Container>
    <Fragment>
      {loading ? <Loader /> : (
        <div className={classes.paperr}>
          <MetaData title={'Your Profile'} />
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography 
                    variant="h4" 
                    gutterBottom

                  >
                    My Profile
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="secondary"
                    gutterBottom
                  >
                    Full Name : 
                  </Typography>
                  <Typography 
                    variant="h7" 
                    gutterBottom
                  >
                    {user.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="secondary"
                    gutterBottom
                  >
                    Email Address :
                  </Typography>
                  <Typography 
                    variant="h7" 
                    gutterBottom
                  >
                    {user.email}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="secondary"
                    gutterBottom
                  >
                    Joined On :
                  </Typography>
                  <Typography 
                    variant="h7" 
                    gutterBottom
                  >
                    {String(user.createdAt).substring(0, 10)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    <Link to="/me/update" variant="body2" color="inherit">
                      {"Edit Profile"}
                    </Link>
                  </Typography>
                 
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <Paper className={classes.paper}> */}
                <Avatar alt="Remy Sharp" 
                  src={user.avatar && user.avatar.url}
                  alt={user && user.name} 
                  className={classes.avatar}
                />
                <Typography variant="body2" color="textSecondary" >
                    <Link to="/password/update" variant="body2" color="inherit">
                      {"Change Password"}
                    </Link>
                  </Typography>
                {/* </Paper> */}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Profile

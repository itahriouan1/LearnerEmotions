import React, { Fragment,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

import { useAlert } from 'react-alert'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Avatar, Container } from '@material-ui/core'


import { getUserDetailsRELATION, clearErrors } from '../../actions/userActions';

import { useDispatch, useSelector } from 'react-redux';



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

const StuentProfile = ({match}) => {

  const classes = useStyles();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector(state => state.auth)
  const {stuentDetails, error, loading } = useSelector((state) => state.userDetails);

  const userId = match.params.id;

  useEffect(() => {
    
    dispatch(getUserDetailsRELATION(userId))

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error,userId])

  return (
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
                    Student Profile
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
                    {stuentDetails && stuentDetails.name}
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
                    {stuentDetails && stuentDetails.email}
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
                    {stuentDetails && String(stuentDetails.createdAt).substring(0, 10)}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" align="center">
                    <Link to="/me/update" variant="body2" color="inherit">
                      {"Edit Profile"}
                    </Link>
                  </Typography> */}
                 
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Avatar alt="Remy Sharp" 
                  src={stuentDetails && stuentDetails.avatar && stuentDetails.avatar.url}
                  alt={stuentDetails && stuentDetails.name} 
                  className={classes.avatar}
                />
                
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default StuentProfile

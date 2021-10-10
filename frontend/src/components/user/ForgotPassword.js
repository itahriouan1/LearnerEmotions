import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loader: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    // color:"secondary",
    // textDecoration:"none"
  }
}));


const ForgotPassword = () => {

  const classes = useStyles();

  const [email, setEmail] = useState('')

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(state => state.forgotPassword)

  useEffect(() => {

      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }

      if (message) {
          alert.success(message)
      }

  }, [dispatch, alert, error, message])

  const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set('email', email);

      dispatch(forgotPassword(formData))
  }

  return (
    <Fragment>
      {/* {loading ? ( 
        <div className={classes.loader}>
          <Loader />
        </div>
      ) : ( */}
        <Fragment>
          <MetaData title={'Login'} />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <form className={classes.form} onSubmit={submitHandler}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading ? true : false}
                >
                  Send Email
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/login" variant="body2" underline="hover" color="#9c27b0" >
                      {"Login"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" variant="body2" underline="hover"  >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              {/* <Copyright /> */}
            </Box>
          </Container>
        </Fragment>
      {/* )} */}
    </Fragment>
  )
}

export default ForgotPassword

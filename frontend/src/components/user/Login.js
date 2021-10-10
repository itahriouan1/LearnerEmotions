import React, { useState, useEffect, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkMUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { Link } from 'react-router-dom'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Expression-Appaaa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function Login({ history, location }) {
  const classes = useStyles();

  const [email, setEmail] = useState('Email Address');
  const [password, setPassword] = useState('password');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {

    if (isAuthenticated) {
      history.push(redirect)
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, history])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <Fragment>
      {loading ? ( 
        <div className={classes.loader}>
          <Loader />
        </div>
      ) : (
        <Fragment>
          <MetaData title={'Login'} />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={submitHandler}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={email}
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
    
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="secondary"  />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/password/forgot" variant="body2" underline="hover" color="#9c27b0" >
                      {"Forgot password?"}
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
      )}
    </Fragment>
  );
}
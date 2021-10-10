import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'

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


const NewPassword = ({ history, match }) => {

  const classes = useStyles();

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector(state => state.forgotPassword)

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password updated successfully')
      history.push('/login')
    }

  }, [dispatch, alert, error, success, history])

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(match.params.token, formData))
  }

  return (
    <Fragment>

      <MetaData title={'New Password Reset'} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Password
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type={'password'}

              label="New Password"
              onChange={(e) => setPassword(e.target.value)}
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type={'password'}
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Set Password
            </Button>
            
          </form>
        </div>
        <Box mt={8}>
          {/* <Copyright /> */}
        </Box>
      </Container>
    </Fragment>
  )
}

export default NewPassword

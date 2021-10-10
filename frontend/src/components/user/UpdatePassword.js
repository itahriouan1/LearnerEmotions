import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';  
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { FormControl, InputLabel, InputAdornment, Input , IconButton    } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  btn:{
    backgroundColor:"#FEE996",
    borderRadius: "30px"
  },
  margin: {
    margin: "1px",
    marginRight: '100px'
  },
  textField: {
    width: '25ch',
  },
  input: {
    display: 'none',
    paddingTop:'50px',
  },
}));


const UpdatePassword = ({ history }) => {

  const classes = useStyles()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)


  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector(state => state.user)

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Password updated successfully')

      history.push('/me')

      dispatch({
          type: UPDATE_PASSWORD_RESET
      })
    }

  }, [dispatch, alert, error, history, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('password', password);

    dispatch(updatePassword(formData))
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <Fragment>
      {loading ? ( 
        <div className={classes.loader}>
        <Loader />
        </div>
      ) : (
        <Container>

          <MetaData title={'Change Password'} />

          <Typography
            variant="h6" 
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Update Password
          </Typography>
            <form noValidate autoComplete="off" onSubmit={submitHandler} >
              <FormControl className={(classes.margin, classes.textField)} style={{marginRight:'20px'}}>
                <InputLabel htmlFor="standard-adornment-password-old">Old Password</InputLabel>
                <Input
                  id="standard-adornment-password-old"
                  name="password"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)} style={{marginRight:'20px'}} >
                <InputLabel htmlFor="standard-adornment-password-new">New Password</InputLabel>
                <Input
                  id="standard-adornment-password-new"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              
              <Button
                className={classes.btn}
                type="submit" 
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
              >
                Update Passwoed
              </Button>
            {/* <div>{name + email + password}</div> */}
          </form>
        </Container>
      )}
        
    </Fragment>
  )
}

export default UpdatePassword

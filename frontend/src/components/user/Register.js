import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';  
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom'
import { FormControl, InputLabel, InputAdornment, Input , IconButton    } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Avatar from '@material-ui/core/Avatar'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'

import M from 'materialize-css' 

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
  },
  textField: {
    width: '25ch',
  },
  input: {
    display: 'none',
    paddingTop:'50px',
  },
}));

const Register = ({ history }) => {
  const classes = useStyles()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = user;

  const [showPassword, setShowPassword] = useState(false)

  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  useEffect(() => {

    if (isAuthenticated) {
      history.push('/')
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, history])

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);

    dispatch(register(formData))
  }

  const onChange = e => {
    if (e.target.name === 'avatar') {

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])

    } else {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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

          <MetaData title={'Register User'} />

          <Typography
            variant="h6" 
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Register
          </Typography>
            <form noValidate autoComplete="off" onSubmit={submitHandler} encType='multipart/form-data'>
              <TextField className={classes.field}
                name="name"
                defaultValue={name}
                onChange={onChange}
                label="Name" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                // error={nameError}
              />
              <TextField className={classes.field}
                name="email"
                defaultValue={email}
                onChange={onChange}
                label="Email" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                // error={nameError}
              />
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={onChange}
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
              <div style={{paddingTop:"30px",paddingBottom:"25px"}}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  name='avatar'
                  onChange={onChange}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload pic |
                  <Avatar style={{ marginLeft: '.3rem' }} alt="image uploaded" src={avatarPreview} />          
                  </Button>
                </label>
              </div>
              
              <Button
                className={classes.btn}
                type="submit" 
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
              >
                Register
              </Button>
            {/* <div>{name + email + password}</div> */}
          </form>
        </Container>
      )}
        
    </Fragment>
  )
}

export default Register

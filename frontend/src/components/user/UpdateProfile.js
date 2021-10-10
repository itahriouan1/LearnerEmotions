import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';  
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import {
  updateProfile,
  loadUser,
  clearErrors,
} from '../../actions/userActions';

import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

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

const UpdateProfile = ({ history }) => {

  const classes = useStyles()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User updated successfully');
      dispatch(loadUser());

      history.push('/me');

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      {loading ? ( 
        <div className={classes.loader}>
        <Loader />
        </div>
      ) : (
        <Container>

          <MetaData title={'Update Profile'} />

          <Typography
            variant="h6" 
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Update Profile
          </Typography>
            <form noValidate autoComplete="off" onSubmit={submitHandler} encType='multipart/form-data'>
              <TextField className={classes.field}
                name="name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                label="Name" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                // error={nameError}
              />
              <TextField className={classes.field}
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                // error={nameError}
              />
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
                disabled={loading ? true : false}
                endIcon={<KeyboardArrowRightIcon />}
              >
                Update
              </Button>
          </form>
        </Container>
      )}
        
    </Fragment>
  );
};

export default UpdateProfile;

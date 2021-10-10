import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import Button from '@material-ui/core/Button'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import Grid from '@material-ui/core/Grid';

// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom'

import Container from '@material-ui/core/Container';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
// import Group from './Group'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getGroups } from '../../actions/groupActions'

const useStyles = makeStyles((theme) =>({
  root: {
    width: 600,
    alignItems: 'center',

  },
  paper: {
    marginTop: theme.spacing(+5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  btn:{
    display: 'flex',
    backgroundColor:"#FEE996",
    borderRadius: "30px",
    alignItems: "center"
  },
  loader: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const GroupRoute = ({ match }) => {
  const classes = useStyles();
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory()


  const { loading, groups, error, groupsCount} = useSelector(state => state.groups)

  useEffect(() => {
    if (error) {
        return alert.error(error)
    }

    dispatch(getGroups());


  }, [dispatch, alert, error])


  return (
      
    <Fragment>
      <MetaData title={'Group Route'} />
      {loading ? ( 
        <div className={classes.loader}>
        <Loader />
        </div>
      ) : (
        <Container>
          <div className={classes.paper}>
            <Button 
              variant="contained" 
              className={classes.btn}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={()=>{
                history.push('/creategroup')
              }}
            >
            Add Group
            </Button>
          </div>
          {groupsCount > 0 ? (

            <div className={classes.paper}>
              <Paper className={classes.root}>
                <MenuList>
                  {groups.map(group =>(
                    <Link to={`/group/${group._id}`} className={classes.link}>
                      <MenuItem>
                        <ListItemIcon>
                          <PeopleAltOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <Grid container justify="space-between"> 
                          <Grid xs={9}>  
                            <Typography inline variant="body1" align="left" style={{marginTop:'12px'}}>{group.name} </Typography>
                          </Grid>
                          <Grid xs={3}>  
                            <Typography inline variant="inherit" align="right">{group.students.length} Students<br />0 Sessions</Typography><br />
                          </Grid>
                        </Grid>
                      </MenuItem>
                      <hr style={{ borderTop: '0.01px', color:'silver'}}/>
                    </Link>
                  ))}
                  
                </MenuList>
              </Paper>
            </div>
          ) : (
            <div className={classes.paper}>
              <Typography variant="inherit" >You have no group </Typography><br />
            </div>
          )}
        </Container>
      )}
    </Fragment>
  );

}


export default GroupRoute

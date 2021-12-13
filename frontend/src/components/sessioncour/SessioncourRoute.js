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

import Select from "react-select"

import Grid from '@material-ui/core/Grid';

// import Radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom'

import Container from '@material-ui/core/Container';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

// Masonry
import Masonry from 'react-masonry-css'



/////////////////////
import Avatar from '@material-ui/core/Avatar'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// Dialog import
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SessionCard from './SessionCard'


import { getMySessionscoursTeacher, newSessioncour, setStatusSessioncour, deleteSessioncour, clearErrors } from '../../actions/sessioncourActions'
import { UPDATE_SESSIONCOUR_STATUS_RESET, NEW_SESSIONCOUR_RESET, DELETE_SESSIONCOUR_RESET } from '../../constants/sessioncourConstants'
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
    alignItems: "center",
  },
  loader: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    minWidth: 500,  
  },

}));

const SessioncourRoute = ({ match }) => {
  
  const classes = useStyles();
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory()

  const [open, setOpen] = useState(false);
  const [ref, setRef] = useState(0);

  const [nameSession,setNameSession]= useState("")
  const [description,setDescription]= useState("")
  const [labelValueGroups,setLabelValueGroups]= useState([])
  const [typeSession, setTypeSession] = useState('tp')


  const { loading, mysessioncoursteacher, error } = useSelector(state => state.allMySessioncoursTeacher)
  const { error:errorNewSessioncour , loading : loadingNewSessioncour, success: newSessioncourSuccess , sessioncourMessage } = useSelector(state => state.newSessioncour);
  
  const { groups, groupsCount} = useSelector(state => state.groups)
  const { error: updateError, isUpdated, isDeleted, error: deleteError } = useSelector(state => state.sessioncour);
  // const { error: deleteError, isDeleted } = useSelector(state => state.sessioncour)


  useEffect(() => {
    console.log("dispatchh")
    console.log(ref)
    if (error) {
        return alert.error(error)
    }

    dispatch(getMySessionscoursTeacher());

    if (updateError || errorNewSessioncour) {
      alert.error(updateError);
      dispatch(clearErrors())
    }

    if (isUpdated) {
      history.push('/allsessions');
      alert.success('Sessioncour updated successfully');
      dispatch({ type: UPDATE_SESSIONCOUR_STATUS_RESET })
    }

    if (newSessioncourSuccess) {
      history.push('/allsessions');
      alert.success('Sessincour created successfully');
      dispatch({ type: NEW_SESSIONCOUR_RESET })
    }

    if (errorNewSessioncour) {
      alert.error(errorNewSessioncour);
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors())
    }

    if (isDeleted) {
        alert.success('Sessioncour deleted successfully');
        history.push('/allsessions');
        dispatch({ type: DELETE_SESSIONCOUR_RESET })
    }
  }, [dispatch, alert, error, ref, deleteError, isDeleted, newSessioncourSuccess, errorNewSessioncour])

  useEffect(() => {
    groupsCount > 0 && groups.map((gr)=>(
      labelValueGroups.push({value:gr._id,label:gr.name})
    ))
  },[groupsCount])
  const PostData = ()=>{
    // e.preventDefault()
    let data = { 
      'name':nameSession, 
      'description':description , 
      'natureSession':typeSession , 
      'status':0,
      'createdBy':'',
      'groups':Displayvalue
    }
    dispatch(newSessioncour(data))
    handleClose()
    setRef(ref => ref + 5)
    setNameSession("")
    setDescription("")
    setTypeSession("tp")
  }

  const handleClickOpen = () => {
    dispatch(getGroups());
    // groupsCount > 0 && groups.map((gr)=>(
    //   labelValueGroups.push(labelValueGroups => [...labelValueGroups, {value:gr._id,label:gr.name}])
    //   // labelValueGroups.push({value:gr._id,label:gr.name})
    // ))
    setOpen(true);
  };

  const handleClose = () => {
    setLabelValueGroups([])
    setOpen(false);
  };

	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1
	};


  const statusSessioncour = (id, status) => {
    const formData = new FormData();
    if(status == 0 || status == 2){
      formData.set('status', 1);
      dispatch(setStatusSessioncour(id, formData));
      console.log('start')
      setRef(ref => ref + 5)
      console.log(ref)

    }else{
      formData.set('status', 2);
      dispatch(setStatusSessioncour(id, formData));
      console.log('paus')
      setRef(ref => ref + 5)
      console.log(ref)

    }
  };

  const fDeleteSessioncour = (id) => {
    dispatch(deleteSessioncour(id));
  };

  var [Displayvalue,getvalue]= useState()
  var getGroupSelected = (e)=>(
    // Array.isArray(e)?e.map(x=>setForGroups.push(x)):[]
    getvalue(Array.isArray(e)?e.map(x=>({'group':x.value})):[])
  )

  return (
      
    <Fragment>
      <MetaData title={'Sessioncour Route'} />
      {(loading || loadingNewSessioncour) ? ( 
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
              onClick={handleClickOpen}
            >
              Add Session
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
              <DialogTitle id="form-dialog-title">Add a course session</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Container>
                    <TextField className={classes.field}
                      defaultValue={nameSession}
                      onChange={(e) => setNameSession(e.target.value)}
                      label="Name" 
                      variant="outlined" 
                      color="secondary" 
                      fullWidth
                      required
                    />
                    <TextField className={classes.field}
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
                      label="Description" 
                      variant="outlined" 
                      color="secondary" 
                      fullWidth
                      required
                    />
                    <div className="input-field col s12">               
                      <label>Select groups*</label>
                    </div>
                    {/* {groupsCount > 0 && groups.map((gr)=>(
                      labelValueGroups.push({value:gr._id,label:gr.name})
                    ))} */}
                    <Select isMulti key={labelValueGroups.value} options={labelValueGroups} onChange={getGroupSelected}></Select>
                    {/* <h5 style={{color:"apricot"}}>{Displayvalue}</h5> */}
                    <FormControl className={classes.field}>
                      <FormLabel>Type Session</FormLabel>
                        <RadioGroup value={typeSession} onChange={(e) => setTypeSession(e.target.value)}>
                          <FormControlLabel value="Tp" control={<Radio />} label="Tp" />
                          <FormControlLabel value="Td" control={<Radio />} label="Td" />
                          <FormControlLabel value="Cour" control={<Radio />} label="Cour" />
                          <FormControlLabel value="Exame" control={<Radio />} label="Controle" />
                        </RadioGroup>
                    </FormControl>                  
                  </Container>
                </DialogContentText>
                
              </DialogContent>
              <DialogActions>
                <Button className={classes.btn} onClick={handleClose} >
                  Cancel
                </Button>
                <Button className={classes.btn} onClick={PostData} >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {mysessioncoursteacher.count > 0 ? (
            <Container>
              <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">

                {/* {
                  mysessioncoursteacher.sessioncours.map( async (sessioncour) => (
                    <div key={sessioncour._id}>
                      <SessionCard session={sessioncour} />
                    </div>
                  ))
                }   */}
                {mysessioncoursteacher.sessioncours.map(sessioncour => (
                  <div key={sessioncour._id}>
                    <SessionCard statusSessioncour ={statusSessioncour} session={sessioncour} fDeleteSessioncour={fDeleteSessioncour}/>
                  </div>
                ))}
              </Masonry>
            </Container>
          ) : (
            <div className={classes.paper}>
              <Typography variant="inherit" >You have no session </Typography><br />
            </div>
          )}
        </Container>
      )}
    </Fragment>
  );

}


export default SessioncourRoute

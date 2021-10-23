import React, { Fragment, useState, useEffect } from 'react';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import Container from '@material-ui/core/Container';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import Avatar from '@material-ui/core/Avatar'

import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

// Dialog import
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import raio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import { Link } from 'react-router-dom'

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupDetails, clearErrors } from '../../actions/groupActions';
import { allUsersGroup } from '../../actions/userActions';
import { allSessioncoursGroup } from '../../actions/sessioncourActions';
import { newGroup } from '../../actions/groupActions'
import { NEW_GROUP_RESET } from '../../constants/groupConstants'

import * as XLSX from "xlsx"


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
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  btnUpload:{
    backgroundColor:"#FFF",
    borderRadius: "5px"
  },
  active: {
    background: '#f4f4f4'
  },
}));

const GroupDetails = ({ match, history }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [valueRadio, setValueRadio] = React.useState('addstudents');
  const [items, setItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [liststudents, setListstudents] = useState([]);

  const [matchParamsId, setMatchParamsId] = useState(match.params.id);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, group } = useSelector((state) => state.groupDetails);
  const { users } = useSelector((state) => state.allUsersGroup);
  const { sessioncours } = useSelector((state) => state.allSessioncoursGroup);

  const { loadingnewGroup=loading , errorewGroup=error, success } = useSelector(state => state.newGroup);
  

  useEffect(() => {
    dispatch(getGroupDetails(matchParamsId));
    dispatch(allUsersGroup(matchParamsId));
    dispatch(allSessioncoursGroup(matchParamsId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (errorewGroup) {
      alert.error(errorewGroup);
      dispatch(clearErrors());
    }

    if (success) {
      setOpen(false);
      alert.success('Stuent add successfully');
      dispatch({ type: NEW_GROUP_RESET })
    }
  }, [dispatch,success,alert, error, match.params.id]);

  const PostData = ()=>{
    // e.preventDefault()

    let addstudentsexcel = { 'typeadd':'addstudentsinexistegroup', 'students':items, 'idgroup':group._id }
    if (valueRadio === "addstudentsexcel" && items.length != 0) {
      dispatch(newGroup(addstudentsexcel))
    }

    let addstudents = { 'typeadd':'addstudentsinexistegroup', 'students':liststudents, 'idgroup':group._id }
    if ( valueRadio === "addstudents" && liststudents.length != 0) {
      dispatch(newGroup(addstudents))
    }

    let addstudentsresearch = { 'typeadd':'addstudentsresearch', 'idgroup':match.params.id }
    if ( valueRadio === "addstudentsresearch" && items.length != 0) {
      dispatch(newGroup(addstudentsresearch))
    }
    
  }

  function pushliststudents() {
    let liststudentstempo = liststudents
    liststudentstempo.push({'nom':lastName,'prenom':firstName})
    setListstudents(oldArray => [...liststudentstempo])

    setFirstName(firstName => "")
    setLastName(lastName => "")

    console.log("liststudents")
    console.log(liststudents)
    console.log(liststudents.length)
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d)
        setItems(d);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (event) => {
    setValueRadio(event.target.value);
  };

  return (
    <Fragment>
      <MetaData title={group.name} />
      <Container>
        {(loading || loadingnewGroup )? (
          <div className={classes.loader}>
            <Loader />
          </div>
        ) : (
          <Fragment>
            {group ? (
              <Fragment>
                <Typography 
                  variant="h4" 
                  gutterBottom

                >
                  Group Info
                </Typography>
                <Typography 
                  variant="h6" 
                  color="secondary"
                  gutterBottom
                >
                  Group Name : 
                </Typography>
                <Typography 
                  variant="h7" 
                  gutterBottom
                >
                  {group.name}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="secondary"
                  gutterBottom
                >
                  Group description :
                </Typography>
                <Typography 
                  variant="h7" 
                  gutterBottom
                >
                  {group.description}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="secondary"
                  gutterBottom
                >
                  Created At :
                </Typography>
                <Typography 
                  variant="h7" 
                  gutterBottom
                >
                  {group.createdAt}
                </Typography>
                <div className={classes.paper}>
                  <div className={classes.paper}>
                    <Button 
                      variant="contained" 
                      className={classes.btn}
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                      onClick={handleClickOpen}
                    >
                    Add Students
                    </Button>
                    {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                      Open form dialog
                    </Button> */}
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Add students</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          <Container>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">Add students</FormLabel>
                              <RadioGroup aria-label="type" name="studentstype" value={valueRadio} onChange={handleChange}>
                                <FormControlLabel value="addstudents" control={<Radio />} label="Add students " />
                                <FormControlLabel value="addstudentsexcel" control={<Radio />} label="Add students (Excel fill)" />
                                <FormControlLabel value="addstudentsresearch" control={<Radio />} label="Add students (Research)" />
                              </RadioGroup>
                            </FormControl>
                          </Container>
                        </DialogContentText>
                        {valueRadio === "addstudentsexcel" && (
                          <Fragment>
                            <div style={{paddingTop:"10px",paddingBottom:"25px"}}>

                              <Button
                                variant="contained"
                                component="label"
                                className={classes.btnUpload}
                              >
                                Upload File
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                  }}
                                  hidden
                                />
                              </Button>
                            </div>  

                            <table className="table container">
                              <thead>
                                <tr>
                                  <th scope="col">{items.length > 0 ? "Nom" : ""}</th>
                                  <th scope="col">{items.length > 0 ? "Prénom" : ""}</th>
                                  <th scope="col">{items.length > 0 ? "Email" : ""}</th>
                                  <th scope="col">{items.length > 0 ? "Password" : ""}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((d) => (
                                  <tr key={d.nom}>
                                    <th>{d.nom}</th>
                                    <td>{d.prenom}</td>
                                    <td>{d.nom+"_"+d.prenom.substr(0, 3)+"@upf.ac.ma"}</td>
                                    <td>Upf_{new Date().getFullYear()}</td>

                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Fragment>

                        )}
                        {valueRadio === "addstudents" && (
                          <Fragment>
                            <Paper className={classes.paper}>
                              <Typography 
                                variant="h6" 
                                gutterBottom

                              >
                                add students
                              </Typography>
                              
                              {liststudents.length > 0 && (
                                  <table className="table container">
                                    <thead>
                                      <tr>
                                        <th scope="col">{liststudents.length > 0 ? "Nom" : ""}</th>
                                        <th scope="col">{liststudents.length > 0 ? "Prénom" : ""}</th>
                                        <th scope="col">{liststudents.length > 0 ? "Email" : ""}</th>
                                        <th scope="col">{liststudents.length > 0 ? "Password" : ""}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {liststudents.map((d) => (
                                        <tr key={d.nom}>
                                          <th>{d.nom}</th>
                                          <td>{d.prenom}</td>
                                          <td>{d.nom+"_"+d.prenom.substr(0, 3)+"@upf.ac.ma"}</td>
                                          <td>Upf_{new Date().getFullYear()}</td>

                                        </tr>
                                      ))} 
                                    </tbody>
                                  </table>
                              )} 
                              <Grid container justify="space-between">
                                <Grid item xs={5}>
                                  <Container>
                                    <TextField className={classes.field}
                                      onChange={(e) => setFirstName(e.target.value)}
                                      label="first name" 
                                      variant="outlined" 
                                      color="secondary" 
                                      value={firstName}
                                      fullWidth
                                      required
                                    />
                                  </Container>
                                </Grid>
                                <Grid item xs={5}>
                                  <Container>
                                    <TextField className={classes.field}
                                      onChange={(e) => setLastName(e.target.value)}
                                      label="last name" 
                                      variant="outlined" 
                                      color="secondary" 
                                      value={lastName}
                                      fullWidth
                                      required
                                    />
                                  </Container>
                                </Grid>
                                <Grid item xs={2}>
                                  <Fab style={{marginTop:'20px'}}
                                    color="primary" 
                                    aria-label="add"
                                    onClick={pushliststudents}
                                    >
                                    <AddIcon />
                                  </Fab>
                                </Grid>
                              </Grid>    
                            </Paper>
                          </Fragment>
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button className={classes.btn} onClick={handleClose} >
                          Cancel
                        </Button>
                        <Button className={classes.btn} onClick={PostData} >
                          Added
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <Typography inline variant="body1" align="left" style={{marginTop:'12px'}}>Liste Student</Typography>                  
                  <Paper className={classes.root}>
                    <MenuList>
                      {users && users.map((student) => (
                        <Link to={`/student/${student._id}`} className={classes.link}>
                          <MenuItem>
                              <ListItemIcon>
                                <Avatar 
                                  alt={student && student.name} 
                                  src={student.avatar && student.avatar.url}
                                />
                                {/* <PeopleAltOutlinedIcon fontSize="small" /> */}
                              </ListItemIcon>               
                            <Typography inline variant="body1" style={{marginTop:'12px'}}>{student.email} </Typography>
                          </MenuItem>
                          <hr style={{ borderTop: '0.01px', color:'silver'}}/>
                        </Link>
                      ))}
                    </MenuList>
                  </Paper>
                </div>

                <div className={classes.paper}>
                  <div className={classes.paper}>
                    <Button 
                      variant="contained" 
                      className={classes.btn}
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                      onClick={()=>{
                        history.push('/sessionscour')
                      }}
                    >
                    Add Session
                    </Button>
                  </div>





                  <Typography inline variant="body1" align="left" style={{marginTop:'12px'}}>Liste Sessions</Typography>                  
                  <Paper className={classes.root}>
                    <MenuList>
                      {sessioncours && sessioncours.map((sessioncour) => (
                        <Link to={`/sessioninfo/${sessioncour._id}`} className={classes.link}>
                          <MenuItem>
                              <ListItemIcon>
                                <PeopleAltOutlinedIcon fontSize="small" />
                              </ListItemIcon>               
                            <Typography inline variant="body1" style={{marginTop:'12px'}}>{sessioncour.name} </Typography>
                          </MenuItem>
                          <hr style={{ borderTop: '0.01px', color:'silver'}}/>
                        </Link>
                      ))}
                    </MenuList>
                  </Paper>
                </div>
              </Fragment>
            ):(
              <h1>ss</h1>

            )}

          </Fragment>
        )}
      </Container>
    </Fragment>
  );
};

export default GroupDetails;

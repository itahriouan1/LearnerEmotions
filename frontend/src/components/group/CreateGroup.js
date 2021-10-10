import React,{Fragment,useState,useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

// import Radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useHistory } from 'react-router-dom'
// import { Alert } from '@material-ui/lab'
import { useAlert } from 'react-alert'

import M from 'materialize-css'
import * as XLSX from "xlsx"

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { newGroup, clearErrors } from '../../actions/groupActions'
import { NEW_GROUP_RESET } from '../../constants/groupConstants'


const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },btnUpload:{
    backgroundColor:"#FFF",
    borderRadius: "5px"
  },
  btn:{
    backgroundColor:"#FEE996",
    borderRadius: "30px"
  },
  loader: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width:'550px',
  },
}));

const  CreateGroup = ({ history }) => {
  const classes = useStyles()

  // const history = useHistory()
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(state => state.newGroup);

  const [name,setName] = useState("");
  const [nameError, setNameError] = useState(false)
  const [description,setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false)
  const [items, setItems] = useState([]);
  const [valueRadio, setValueRadio] = React.useState('addstudentslater');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [liststudents, setListstudents] = useState([]);
  const [previousListstudents, setPreviousListstudents] = useState([]);

  useEffect(() => {

    if (error) {
        alert.error(error);
        dispatch(clearErrors())
    }

    if (success) {
        history.push('/groups');
        alert.success('Group created successfully');
        dispatch({ type: NEW_GROUP_RESET })
    }

  }, [dispatch, alert, error, success, history])

  console.log("liststudents after")
  console.log(liststudents)
  console.log(liststudents.length)

  function pushliststudents() {
    let liststudentstempo = liststudents
    liststudentstempo.push({'nom':lastName,'prenom':firstName})
    // setNeutral(neutral => neutral + detections.expressions.neutral)
    // setCart(cart => [...cart, item]);
    setListstudents(oldArray => [...liststudentstempo])

    setFirstName(firstName => "")
    setLastName(lastName => "")

    // setListstudents(liststudents => [...liststudents, {'nom':lastName,'prenom':firstName}])
    // setListstudents(liststudents => liststudentstempo)
    
    // setPreviousListstudents([{'nom':lastName,'prenom':firstName}])
    // if(previousListstudents.length > 0){
    //   previousListstudents.map(()=>(

    //   ))
    // }
    // setListstudents([{'nom':lastName,'prenom':firstName}])
    // if(previousListstudents.length == 0){
    //   setPreviousListstudents([{'nom':lastName,'prenom':firstName}])
    // }
    console.log("liststudents")
    console.log(liststudents)
    console.log(liststudents.length)
  };

  const handleChange = (event) => {
    setValueRadio(event.target.value);
  };


  const PostData = (e)=>{
    e.preventDefault()

    setNameError(false)
    setDescriptionError(false)

    if (name == '') {
      setNameError(true)
    }
    if (description == '') {
      setDescriptionError(true)
    }

    let addstudentsexcel = { 'typeadd':'addstudentsexcel', 'name':name , 'description':description , 'students':items }
    if (name && description && valueRadio === "addstudentsexcel" && items.length != 0) {
      dispatch(newGroup(addstudentsexcel))
    }

    let addstudentslater = { 'typeadd':'addstudentslater', 'name':name , 'description':description }
    if (name && description && valueRadio === "addstudentslater" ) {
      dispatch(newGroup(addstudentslater))
    }

    let addstudents = { 'typeadd':'addstudents', 'name':name , 'description':description, 'students':liststudents }
    if (name && description && valueRadio === "addstudents" && liststudents.length != 0) {
      dispatch(newGroup(addstudents))
    }

    let addstudentsresearch = { 'typeadd':'addstudentsresearch', 'name':name , 'description':description }
    if (name && description && valueRadio === "addstudentsresearch" && items.length != 0) {
      dispatch(newGroup(addstudentsresearch))
    }

    // [
    //   { prenom: 'aya', nom: 'bouaicha' },
    //   { prenom: 'samah', nom: 'bouaicha' }
    // ]
    // let allitems =[]
    // items.map((item)=>(
    //   allitems.push({'prenom':item.nom ,"nom":item.prenom})
    // ))
    // items.forEach(item => {
    //   allitems.push({'prenom':item.nom ,"nom":item.prenom})
    // })
    // items.forEach(students => {
      // formData.append('students', items)
    // })

    // const promises = items.map(obj => {    
    //   Object.keys(obj).forEach(key => {
    //     formData.append(key, obj[key]);
    //   });
    // })
    // Promise.all(promises).then(() => {
    //   console.log('All files were uploaded');
    // }).catch(error => {
    //   console.error(error);
    // });
    
    // formData.set('allitems', allitems);
    // let a = [];
    // a.push({'name':name , 'description':description})
    // a.push({'description':description})
    // a.push({"students":[items]})
    
  }
  // console.log(typeof allitems)
  // console.log(allitems)

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

  return (
    <Fragment>
      <MetaData title={'New Group'} />
      {loading ? ( 
        <div className={classes.loader}>
        <Loader />
        </div>
      ) : (
        <Container size="sm">
          {/* <h6>{items && items}</h6> */}
          <Typography
            variant="h6" 
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Create a New Group
          </Typography>
          <form noValidate autoComplete="off" onSubmit={PostData} encType='multipart/form-data'>
            <TextField className={classes.field}
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              label="Group Name" 
              variant="outlined" 
              color="secondary" 
              fullWidth
              required
              error={nameError}
            />
            <TextField className={classes.field}
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description" 
              variant="outlined" 
              color="secondary" 
              fullWidth
              required
              error={descriptionError}
            />
            <Container>
              <FormControl component="fieldset">
                <FormLabel component="legend">Add students</FormLabel>
                <RadioGroup aria-label="type" name="studentstype" value={valueRadio} onChange={handleChange}>
                  <FormControlLabel value="addstudentslater" control={<Radio />} label="later" />
                  <FormControlLabel value="addstudentsexcel" control={<Radio />} label="Add students (Excel fill)" />
                  <FormControlLabel value="addstudents" control={<Radio />} label="Add students " />
                  <FormControlLabel value="addstudentsresearch" control={<Radio />} label="Add students (Research)" />
                </RadioGroup>
              </FormControl>
            </Container>
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
            <Container>
              <Button
                className={classes.btn}
                type="submit" 
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
              >
                Create Group
              </Button>
            </Container>

          </form>  
          {/* {datasuccess ? <Alert severity="success">{datasuccess}</Alert> : ""}
          {dataerror ? <Alert severity="error">{dataerror}</Alert> : ""} */}

        </Container>
      )}
    </Fragment>
  );
}

export default CreateGroup;
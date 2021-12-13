import React, { Fragment,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useAlert } from 'react-alert'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Avatar, Container } from '@material-ui/core'

import { Chart } from "react-google-charts";


import { getUserDetailsRELATION, clearErrors } from '../../actions/userActions';
import { getSessionsNoActiveStudentTeacher } from '../../actions/sessioncourActions';
import { getExpressionStudent } from '../../actions/expressionActions';

import { EXPRESSION_STUDENT_RESET } from '../../constants/expressionConstants';




import { useDispatch, useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  paperr: {
    marginTop: theme.spacing(-1),
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    flexGrow: 1,

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width:250,
    height:250
  },
  formControl: {
    margin: theme.spacing(1),
    Width: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

const StuentProfile = ({match}) => {

  const classes = useStyles();

  const dispatch = useDispatch();
  const alert = useAlert();

  const [session, setSession] = React.useState('');
  const [tablemultiexp, setTablemultiexp] = React.useState([]);

  const { user } = useSelector(state => state.auth)
  const {stuentDetails, error, loading } = useSelector((state) => state.userDetails);
  const {sessioncoursNoActiveStudentTeacher, } = useSelector((state) => state.sessionnoactivestudentteacher);
  const { sessioncour, expression, expressiontime} = useSelector(state => state.expressionStudent)


  const userId = match.params.id;

  useEffect(() => {
    
    dispatch(getUserDetailsRELATION(userId))
    dispatch(getSessionsNoActiveStudentTeacher(userId))

    if(session == ''){
      dispatch({ type: EXPRESSION_STUDENT_RESET })

    } 
    

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error,userId])

  useEffect(() => {
    
    let t = [ ['x', 'neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised']];
    let i = 1;
    expressiontime && expressiontime.length > 0 ? (
      expressiontime.map(exp => (
        t.push([i++,exp.neutral,exp.happy,exp.sad,exp.angry,exp.fearful,exp.disgusted,exp.surprised])
        // t.push([(exp.dateTimeStartRecording).slice(),exp.neutral,exp.happy,exp.sad,exp.angry,exp.fearful,exp.disgusted,exp.surpriseddd])
      ))
    ):(
      console.log('nn')
    )
    setTablemultiexp(t)
  }, [expressiontime])

  const handleChange = (event) => {
    setSession(event.target.value);
    console.log(session)
    dispatch(getExpressionStudent(event.target.value, userId));
  };


  return (
    <Fragment>
      {loading ? <Loader /> : (
        <div className={classes.paperr}>
          <MetaData title={'Your Profile'} />
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography 
                    variant="h4" 
                    gutterBottom

                  >
                    Student Profile
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="secondary"
                    gutterBottom
                  >
                    Full Name : 
                  </Typography>
                  <Typography 
                    variant="h7" 
                    gutterBottom
                  >
                    {stuentDetails && stuentDetails.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="secondary"
                    gutterBottom
                  >
                    Email Address :
                  </Typography>
                  <Typography 
                    variant="h7" 
                    gutterBottom
                  >
                    {stuentDetails && stuentDetails.email}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="secondary"
                    gutterBottom
                  >
                    Joined On :
                  </Typography>
                  <Typography 
                    variant="h7" 
                    gutterBottom
                  >
                    {stuentDetails && String(stuentDetails.createdAt).substring(0, 10)}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" align="center">
                    <Link to="/me/update" variant="body2" color="inherit">
                      {"Edit Profile"}
                    </Link>
                  </Typography> */}
                 
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Avatar 
                  src={stuentDetails && stuentDetails.avatar && stuentDetails.avatar.url}
                  alt={stuentDetails && stuentDetails.name} 
                  className={classes.avatar}
                />
                
              </Grid>
            </Grid>
          </div>
          <FormControl style={{width: 200}} className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Session</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={session}
              onChange={handleChange}
              autoWidth
            >

              {/* {getSessionsNoActiveStudentTeacher && getSessionsNoActiveStudentTeacher.sessioncoursNoActiveStudentTeacher.map((sessioncour)=>(
                console.log(getSessionsNoActiveStudentTeacher)

              ))} */}
              {sessioncoursNoActiveStudentTeacher &&  sessioncoursNoActiveStudentTeacher.map((session)=>(
                <MenuItem value={session._id}>{session.name}</MenuItem>

              ))}
            </Select>
          </FormControl>

          <Typography 
            variant="h4" 
            gutterBottom

          >
            Expression
          </Typography>
          {session ? (
            expression && expression.length > 0 ? (
              expression.map(exp=>(
                <div>
                  { ( exp.neutral == 0 && exp.happy == 0 && exp.sad == 0 && exp.angry == 0 && exp.fearful == 0 && exp.disgusted == 0 && exp.surprised == 0 ) ?
                    (
                      <Typography 
                        variant="h7" 
                        gutterBottom
                      >
                        No Expression
                      </Typography>
  
                    ):(
                      <div>

                      <Chart
                        width={'600px'}
                        height={'400px'}
                        chartType="PieChart"
                        loader={<div>Loading Expression</div>}
                        data={[
                          ['Expression', 'Value-Expression'],
                          ['neutral', exp.neutral],
                          ['happy', exp.happy],
                          ['sad', exp.sad],
                          ['angry', exp.angry],
                          ['fearful', exp.fearful],
                          ['disgusted', exp.disgusted],
                          ['surprised', exp.surprised]
                        ]}
                        options={{
                          title: 'My Expressin in s',
                          is3D: true,
                          backgroundColor: '# EE82EE'
                        }}
                        rootProps={{ 'data-testid': '4' }}
                      />
                      <Chart
                        width={'600px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={tablemultiexp}
                        options={{
                          hAxis: {
                            title: 'Time',
                          },
                          vAxis: {
                            title: 'Expression',
                          },
                          series: {
                            1: { curveType: 'function' },
                          },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                      />
                     </div>

                    )
                  }
                </div>
  
              ))
            ):(
              <Typography 
                variant="h7" 
                gutterBottom
              >
                No Expression
              </Typography>
            )

          ) : (
            <Typography 
              variant="h7" 
              gutterBottom
            >
              Select Expression
            {/* {expression ? expression = null : ''} */}

            </Typography>
          )
          }

        </div>
        
      )}
    </Fragment>
  )
}

export default StuentProfile

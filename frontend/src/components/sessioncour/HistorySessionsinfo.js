import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Chart } from "react-google-charts";

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



import { getInfoSessioncourStudent, clearErrors } from '../../actions/sessioncourActions'

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
    display: 'block',
    minWidth: 500,  
  },

}));

const HistorySessions = ({ match }) => {
  
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

  const [expressionrecord, setExpressionrecord] = useState(0)
  const [matchParamsId, setMatchParamsId] = useState(match.params.id);

  const { loading, sessioncour, expression, error } = useSelector(state => state.infoSessioncour)



  useEffect(() => {
    
    if (error) {
      return alert.error(error)
      dispatch(clearErrors())

    }

    dispatch(getInfoSessioncourStudent(matchParamsId));

    // if(success){
    //   history.push(`/expressionrecord/${id}`)
    // }

  }, [dispatch, alert, error, ref])


	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1
	};

  const infoSessionHistory = (id) => {
    history.push(`/historySessionsinfo/${id}`)

    // setExpressionrecord(id)
    // dispatch(startExpression(id));
    // setRef(ref => ref + 5)


  };

  return (
      
    <Fragment>
      <MetaData title={'History Sessions'} />
      {(loading) ? ( 
        <div className={classes.loader}>
        <Loader />
        </div>
      ) : (
        <Container>
          {sessioncour ? (
            <Container>
              <Typography 
                variant="h4" 
                gutterBottom

              >
                Session Info
              </Typography>
              <Typography 
                variant="h6" 
                color="secondary"
                gutterBottom
              >
                Session Name : 
              </Typography>
              <Typography 
                variant="h7" 
                gutterBottom
              >
                {sessioncour.name}
              </Typography>
              <Typography 
                variant="h6" 
                color="secondary"
                gutterBottom
              >
                Session description :
              </Typography>
              <Typography 
                variant="h7" 
                gutterBottom
              >
                {sessioncour.description}
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
                {sessioncour.createdAt}
              </Typography>
              <Typography 
                variant="h4" 
                gutterBottom

              >
                Your Expression
              </Typography>
              {expression.length > 0 ? (
                expression.map(exp=>(
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
                      rootProps={{ 'data-testid': '1' }}
                    />
                  </div>

                ))
              ):(
                <Typography 
                variant="h7" 
                gutterBottom
                >
                  No Expression
                </Typography>
              )}
            </Container>
          ) : (
            <div className={classes.paper}>
              <Typography variant="inherit" >there is no history sessions available </Typography><br />
            </div>
          )}
        </Container>
      )}
    </Fragment>
  );

}


export default HistorySessions

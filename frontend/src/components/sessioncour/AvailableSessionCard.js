import React,{useState,useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PieChartIcon from '@material-ui/icons/PieChart';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { yellow, green, pink, blue, red } from '@material-ui/core/colors'

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

// import { getNaturesessioncour, clearErrors } from '../../actions/naturesessioncourActions';

// import { setStatusSessioncour, clearErrors } from '../../actions/sessioncourActions';
// import { UPDATE_SESSIONCOUR_STATUS_RESET } from '../../constants/sessioncourConstants'



const useStyles = makeStyles({
  avatar: {
    // backgroundColor: red[500],
    backgroundColor: (session) => {
      if (session.status == 0) {
        return pink[500]
      }
      if (session.status == 1) {
        return green[500]
      }
      if (session.status == 2) {
        return pink[500]
      }
      return blue[500]
    },
  },
  expand: {
    marginLeft: 'auto',
  },
})


export default function AvailableSessionCard({startTheExpression, session }) {
  const [createdBy,setCreatedBy] = useState("")
  const createdByy = session.createdBy

  const dispatch = useDispatch();
  const alert = useAlert();

  const classes = useStyles(session)
  const history = useHistory()

  const { naturesessioncour, error } = useSelector((state) => state.naturesessioncourDetails);
  // const { loading, error: updateError, isUpdated } = useSelector(state => state.sessioncour);

  useEffect(() => {
    // dispatch(getNaturesessioncour(session.natureSession));

    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(clearErrors())
    // }

    // if (isUpdated) {
    //   history.push('/');
    //   alert.success('Sessioncour Status updated successfully');
    //   dispatch({ type: UPDATE_SESSIONCOUR_STATUS_RESET })
    // }

  }, [dispatch,alert, error]);

  
  // const statusSessioncour = () => {
  //   const formData = new FormData();
  //   if(session.status == 0 || session.status == 2){
  //     formData.set('status', 1);
  //     dispatch(setStatusSessioncour(session._id, formData));
  //   }else{
  //     formData.set('status', 2);
  //     dispatch(setStatusSessioncour(session._id, formData));
  //   }
    
  // };

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {session.natureSession}
            </Avatar>}
          action={
            <IconButton onClick={() => history.push(`/sessioninfo`)}>
              <InfoOutlinedIcon />
            </IconButton>
          }
          title={session.name}
        //   function GetFormattedDate() {
        //     var todayTime = new Date();
        //     var month = format(todayTime .getMonth() + 1);
        //     var day = format(todayTime .getDate());
        //     var year = format(todayTime .getFullYear());
        //     return month + "/" + day + "/" + year;
        // }
          subheader={session.createdAt.substring(0, 10)}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            { session.description }
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Typography
                variant="body1" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                By : {session.natureSession}
            </Typography>

            <IconButton
                className={classes.expand}
                onClick={() => startTheExpression(session._id)}
            >
              <PlayCircleOutlineIcon />
                
            </IconButton>
      </CardActions>
      </Card>
    </div>
  )
}
import React from 'react'

import MetaData from '../layout/MetaData'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-5.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
    marginLeft: theme.spacing(20)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 500,
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 410,
    height: 600,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

}));

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <MetaData title={'About'} />
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Expression - App
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac Miller


            </Typography>
          </CardContent>
          <div className={classes.controls}>

          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="/images/about.jpg"
          title="Live from space album cover"
        />
      </Card>
    </div>
  )
}

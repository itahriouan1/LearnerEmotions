import React, { Fragment } from 'react'
import LinkMUI from '@material-ui/core/Link';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

const Footer = () => {
    return (
      // <Fragment>
      //   <footer className="py-1">
      //     <p className="text-center mt-1">
      //       Expression app - 2019-2020, All Rights Reserved
      //     </p>
      //   </footer>
      // </Fragment>
      <Fragment>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link to="/about" >
            Expression-App
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Fragment>
    )
}

export default Footer

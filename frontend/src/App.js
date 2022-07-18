import React, { useEffect, createContext, useMemo, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'



import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import About from './components/about/About'

// Auth or User imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

import GroupRoute from './components/group/GroupRoute'
import GroupDetails from './components/group/GroupDetails'
import CreateGroup from './components/group/CreateGroup'

import StudentProfile from './components/student/StudentProfile'

import SessioncourRoute from './components/sessioncour/SessioncourRoute'
import AvailableSessions from './components/sessioncour/AvailableSessions'
import HistorySessions from './components/sessioncour/HistorySessions'
import HistorySessionsinfo from './components/sessioncour/HistorySessionsinfo'
import Sessioncourinfo from './components/sessioncour/Sessioncourinfo'

import Expressionrecord from './components/sessioncour/Expressionrecord'

import DashboardRoute from './components/admin/DashboardRoute'




import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'

import { createTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'


const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

export const StreamContext = createContext() 

function App() {

  useEffect(() => {
    store.dispatch(loadUser())

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  

  return (
      <ThemeProvider theme={theme}>
        <Router>
            <Header>
              <Route path="/" component={About} exact />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/me" component={Profile} exact />
              <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
              <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
              <Route path="/password/forgot" component={ForgotPassword} exact />
              <Route path="/password/reset/:token" component={NewPassword} exact />

              <ProtectedRoute path="/groups" component={GroupRoute} exact />
              <ProtectedRoute path="/group/:id" component={GroupDetails} exact />
              <ProtectedRoute path="/creategroup" component={CreateGroup} exact />

              <ProtectedRoute path="/student/:id" component={StudentProfile} exact />
              {/* <ProtectedRoute path="/newstudents" component={StudentProfile} exact /> */}

              <ProtectedRoute path="/allsessions" component={SessioncourRoute} exact />
              <ProtectedRoute path="/availablesessionsstudent" component={AvailableSessions} exact />
              <ProtectedRoute path="/historySessions" component={HistorySessions} exact />
              <ProtectedRoute path="/historySessionsinfo/:id" component={HistorySessionsinfo} exact />
              <ProtectedRoute path="/sessioninfo/:id" component={Sessioncourinfo} exact />

              <ProtectedRoute path="/expressionrecord/:id" component={Expressionrecord} exact />

              <ProtectedRoute path="/dashboard" component={DashboardRoute} exact />
              <ProtectedRoute path="/addadmin" component={Register} exact />


              


            </Header>

            {!loading && (!isAuthenticated || user.role !== 'admin') && (
              <Footer />
            )}
        </Router>
      </ThemeProvider>
  );
}

export default App;

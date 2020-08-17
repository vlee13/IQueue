import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
// import { useHistory as history } from 'history'
import TheContext from './TheContext';
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
// import SignUp from "./components/auth/SignUp";
// import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./api/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import Loader from 'react-loader-spinner'


const App = () => {

  let [user, setUser] = useState(null)
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      console.log('user is', user)
      setUser(user?.data)
      setLoading(false)
    }
    getUser();
  }, [])

  const logOut = async () => {
    let res = await actions.logOut();
    setUser(null);
  };

  const history = useHistory();

  return (
    <TheContext.Provider value={{ history, user, setUser }}>
      
      

    { user ?
      <header>
        <div>{user?.email}</div>
        <div id="logo-container">
          <img id="logo" src="./logo.webp"/>
          IronQueue
        </div>

        <NavLink id="logOut" onClick={logOut} to="/">Log Out</NavLink>
      </header> 
    : null }
      <nav>

        {user ? (
          <Fragment>
            <NavLink to="/">Queue</NavLink>
            <NavLink to="/profile">Profile</NavLink>

          </Fragment>
        ) : (
            <Fragment>
              {/* <NavLink to="/sign-up">Sign Up |</NavLink>
              <NavLink to="/log-in">Log In |</NavLink> */}
              {!user && <GoogleAuth setUser={setUser} history={history}/>}
              {!user && <GoogleAuthLogin setUser={setUser} history={history} />}
            </Fragment>
          )}
      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        {/* <Route
          exact
          path="/sign-up"
          render={(props) => <SignUp {...props} setUser={setUser} history={history}/>}
        />
        <Route
          exact
          path="/log-in"
          render={(props) => <LogIn {...props} setUser={setUser} history={history} />}
        /> */}

        <Route
          exact
          path="/profile"
          render={(props) => <Profile {...props} />}
        />

        <Route component={NotFound} />
      </Switch>



      <NotificationContainer />

      {loading ? 
            
            <h1>Loading...</h1>

      : null }
    </TheContext.Provider>

  )

}
export default App;

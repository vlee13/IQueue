import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
// import { useHistory as history } from 'history'
import TheContext from './TheContext';
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";

import User from "./components/user/User"
import AllUsers from "./components/user/AllUsers";

import Profile from "./components/profile/Profile";
import actions from "./api/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import Loader from 'react-loader-spinner'


const App = () => {

  let [user, setUser] = useState(null)
  let [loading, setLoading] = useState(true)
  let [countdown, setCountDown] = useState(15)
  let [gif, setGif] = useState(null)
  useEffect(() => {
    async function getUser() {
      
      let user = await actions.getUser();
      console.log('user is', user)
      setUser(user?.data)
      setLoading(false)
    }

    async function getGif(){
      setGif( await actions.getGif() )
    } 


    getUser();
    getGif()
    count()
  }, [])


  const count = () => {
    if(countdown > 0){
      setTimeout(()=>{
        setCountDown(--countdown)
        count()
      },1000)
    }
  }

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
          <img id="logo" src="../logo.webp"/>
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
            <NavLink to="/all">Friends</NavLink>

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

        <Route
          exact
          path="/all"
          render={(props) => <AllUsers {...props} />}
        />    

        <Route
          exact
          path="/user/:id"
          render={(props) => <User {...props} />}
        />

        <Route
          exact
          path="/profile"
          render={(props) => <Profile {...props} />}
        />

        <Route component={NotFound} />
      </Switch>



      <NotificationContainer />

      {loading ? 
            
            // <h1 className="loading">Loading</h1>
            <Fragment>
                          
              <div className="loading">
                <h1>Loading<span className="dots"><span>.</span><span>.</span><span>.</span></span></h1>
                <h5>Waking up heroku may take up to <span>{countdown} seconds</span></h5>
                <iframe src={gif} width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
              </div>

            </Fragment>

      : null }
    </TheContext.Provider>

  )

}
export default App;

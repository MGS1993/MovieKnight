import React, { useState, useEffect } from 'react';
import routerContext from '../Components/context/routerContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../Components/HomePage/HomePage';
import Profile from '../Components/profile/Profile';

const ReactRouter = () => {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState("");
  const [ currentUserId, setCurrentUserID ] = useState('');

  
  const handleLogout = () => {
    setCurrentUser("");
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    const loginChecker = () => {
      const loggedInUser = localStorage.getItem("user");
      const loggedInUserId = localStorage.getItem('userId');
      if (loggedInUser && loggedIn === false) {
        setLoggedIn(true);
        setCurrentUser(loggedInUser);
        setCurrentUserID(loggedInUserId);
      }
    };
    loginChecker();
  }, [loggedIn]);
  return(
    <BrowserRouter>
    <Switch>
      <routerContext.Provider 
        value={{currentUser, handleLogout, loggedIn, setLoggedIn, currentUserId}}>
        <Route exact path ='/' component={HomePage} />
        <Route exact path ='/profile' component={Profile} />
      </routerContext.Provider>
    </Switch>
    </BrowserRouter>
  )
}

export default ReactRouter
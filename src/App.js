import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setings from './components/Setings/Setings';

import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';



const App = () => {
  return (
    
      <div className="app-wrapper">
       <HeaderContainer />
        <Navbar />
         <div className="app-wrapper-content">
            <Route path='/dialogs' render={ () => <DialogsContainer /> } />
            <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
            <Route path='/users' render={ () => <UsersContainer /> } />

            <Route path='/news' render={ () => <News /> } />
            <Route path='/music' render={ () => <Music /> } />
            <Route path='/setings' render={ () => <Setings /> } />
            <Route path='/login' render={ () => <Login /> } />
        </div>
      </div>
    
  );
  
}

export default App;

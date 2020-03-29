import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setings from './components/Setings/Setings';

import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UserssContainert';



const App = () => {
  return (
    
      <div className="app-wrapper">
       <Header />
        <Navbar />
         <div className="app-wrapper-content">
            <Route path='/dialogs' render={ () => <DialogsContainer /> } />
            <Route path='/profile' render={ () => <Profile /> } />
            <Route path='/users' render={ () => <UsersContainer /> } />

            <Route path='/news' render={ () => <News /> } />
            <Route path='/music' render={ () => <Music /> } />
            <Route path='/setings' render={ () => <Setings /> } />
        </div>
      </div>
    
  );
  
}

export default App;

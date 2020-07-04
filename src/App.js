import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/redux-store';

import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setings from './components/Setings/Setings';


import UsersContainer from './components/Users/UsersContainer';

import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './components/hoc/withSuspense';

//import DialogsContainer from './components/Dialogs/DialogsContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }
  
  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
              <Route path='/dialogs' render={ withSuspense(DialogsContainer) } />
              <Route path='/profile/:userId?' render={ withSuspense(ProfileContainer) } />
              <Route path='/users' render={ () => <UsersContainer /> } />
              <Route path='/news' render={ () => <News /> } />
              <Route path='/music' render={ () => <Music /> } />
              <Route path='/setings' render={ () => <Setings /> } />
              <Route path='/login' render={ () => <Login /> } />
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose (
 withRouter,
 connect(mapStateToProps, {initializeApp})) (App);

const NewApp = (props) => {
  return  <BrowserRouter>
      <Provider store={store}>
          <AppContainer />
      </Provider>
    </BrowserRouter>
 }

 export default NewApp;
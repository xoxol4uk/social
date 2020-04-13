import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import { connect } from 'react-redux';
import {getAuthUserData} from '../../redux/auth-redux';

class HeaderContainer extends React.Component {
  componentDidMount() {
     this.props.getAuthUserData();
  }

  render() {
    return  <Header {...this.props} />
  }
}

const mapeStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});
export default connect(mapeStateToProps, {getAuthUserData}) (HeaderContainer);
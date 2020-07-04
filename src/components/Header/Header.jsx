import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
	return  (
		<header className={s.header}>
        <img src='https://w0.pngwave.com/png/935/389/university-of-amikom-yogyakarta-condongcatur-logo-social-media-social-media-png-clip-art.png' />
        <div className={s.loginBlock}>
          {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
              : <NavLink to={'/login'}>Login</NavLink> 
          }
        </div>
      </header>
    )
}

export default Header;
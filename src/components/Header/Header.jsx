import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Header = (props) => {
	return  (
		<header className={s.header}>
        <img src='https://w0.pngwave.com/png/935/389/university-of-amikom-yogyakarta-condongcatur-logo-social-media-social-media-png-clip-art.png' />
        <div className={s.loginBlock}>
          {props.isAuth ? props.login
              : <NavLink to={'/login'}>Login</NavLink> 
          }
        </div>
      </header>
    )
}

export default Header;
import React from 'react';
import logo from '../../assets/header/logo.svg';
import MobileMenu from './MobileMenu';

export default function Header() {
   return (
      <header className="header">
         <div className="container">
            <div className="header-row">
               <div className="header-logo">
                  <a href="#logo"><img src={logo} alt="" /></a>
               </div>

               <nav className="header-menu">
                  <ul className="header-menu-items">
                     <li className="header-menu__item">
                        <a className="header-menu__link custom-link" href="/about">About me</a>
                     </li>
                     <li className="header-menu__item">
                        <a className="header-menu__link custom-link" href="/relationships"
                        >Relationships</a
                        >
                     </li>
                     <li className="header-menu__item">
                        <a className="header-menu__link custom-link" href="/requirements"
                        >Requirements</a
                        >
                     </li>
                     <li className="header-menu__item">
                        <a className="header-menu__link custom-link" href="/users">Users</a>
                     </li>
                     <li className="header-menu__item">
                        <a className="header-menu__link custom-link" href="#register">Sign Up</a>
                     </li>
                  </ul>
               </nav>

               <MobileMenu />

            </div>
         </div>
      </header>
   );
}


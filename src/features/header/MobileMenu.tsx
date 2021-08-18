import React from 'react';
import logo from '../../assets/header/logo.svg';
import menuIcon from '../../assets/header/menu icon.svg';

export default function MobileMenu() {
   return (
      <div className="hamburger-menu">
         <input id="menu__toggle" type="checkbox" />
         <label className="menu__btn" htmlFor="menu__toggle">
            <img src={menuIcon} alt="" />
            <span></span>
         </label>
         <div className="menu__box">
            <div className="menu-logo">
               <a href="#logo"><img src={logo} alt="" /></a>
            </div>
            <ul className="menu__group">
               <li>
                  <a className="menu__item custom-link" href="/about">About me</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="/relationships">Relationships</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="#register">Sign Up</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="/terms"
                  >Terms and Conditions</a
                  >
               </li>
            </ul>
            <ul className="menu__group">
               <li>
                  <a className="menu__item custom-link" href="/how">How it works</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="/partnership">Partnership</a>
               </li>
               <li><a className="menu__item custom-link" href="/help">Help</a></li>
               <li>
                  <a className="menu__item custom-link" href="/leave"
                  >Leave testimonial</a
                  >
               </li>
               <li>
                  <a className="menu__item custom-link" href="/contact">Contact us</a>
               </li>
            </ul>
            <ul className="menu__group">
               <li>
                  <a className="menu__item custom-link" href="/articles">Articles</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="/news">Our news</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="/testimonials">Testimonials</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="/licences">Licenses</a>
               </li>
               <li>
                  <a className="menu__item custom-link" href="/privacy"
                  >Privacy Policy</a
                  >
               </li>
            </ul>
         </div>

         <div className="overlay"></div>
      </div>
   );
}


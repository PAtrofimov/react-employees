import React from 'react';
import manLaptop from '../../assets/acquaintance/man-laptop-v1.svg';

export default function Acquaintance() {
   return (

      <div className="acquaintance">
         <div className="container">
            <section className="acquaintance__block">
               <h1 className="acquaintance__title heading1">Let's get acquainted</h1>
               <div className="acquaintance__item">
                  <div className="acquaintance__image">
                     <img src={manLaptop} alt="" />
                  </div>
                  <div className="acquaintance__details">
                     <h2 className="acquaintance__subtitle heading2">
                        I am cool frontend developer
                     </h2>
                     <div className="acquaintance__text">
                        <p className="acquaintance__text1">
                           We will evaluate how clean your approach to writing CSS and
                           Javascript code is. You can use any CSS and Javascript 3rd
                           party libraries without any restriction.
                        </p>
                        <p className="acquaintance__text2">
                           If 3rd party css/javascript libraries are added to the
                           project via bower/npm/yarn you will get bonus points. If you
                           use any task runner (gulp/webpack) you will get bonus points
                           as well. Slice service directory page P​SD mockup​ into
                           HTML5/CSS3.
                        </p>
                     </div>
                     <p className="acquaintance__actions">
                        <a href="#register" className="acquaintance__btn flat-btn">Sing up now</a>
                     </p>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
}


import React from 'react';

export default function Assignment() {
   return (

      <div className="assignment">
         <div className="container">
            <section className="assignment-container">
               <h1 className="assignment__title heading1">
                  Test assignment for Frontend Developer position
               </h1>
               <p className="assignment__text">
                  We kindly remind you that your test assignment should be submitted
                  as a link to github/bitbucket repository. <span className="assignment__text--extra">Please be patient, we
                     consider and respond to every application that meets minimum
                     requirements. We look forward to your submission. Good luck! The
                     photo has to scale in the banner area on the different screens
                  </span>
               </p>
               <p className="assignment__actions">
                  <a href="#register" className="assignment__btn btn">Sing up now</a>
               </p>
            </section>
         </div>
      </div>
   );
}


import React from 'react';
import { User as UserType } from '../../app/types';

export default function User({user}:{user:UserType}) {
   return (
      <div className="user">
         <article className="user-item">
            <div className="user-item__header">
               <div className="user-item__image">
                  <img src={user?.photo} alt="" />
               </div>

               <h2 className="user-item__title heading2"
                  data-name={user.name}
               >
                  {user.name}
               </h2>
            </div>

            <div className="user-item__details">
               <p className="user-item__profession">
                  {user.position}
               </p>
               <p
                  className="user-item__email"
                  data-email={user.email}
               >
                  {user.email}
               </p>
               <p className="user-item__tel">{user.phone}</p>
            </div>
         </article>
      </div>
   );
}


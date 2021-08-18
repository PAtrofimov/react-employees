import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import User from './User';
import { selectUsers, selectNextUrl } from './usersSlice';
import { addUsersAsync } from './usersSlice';

export default function Users() {
   const users = useAppSelector(selectUsers);
   const next_url = useAppSelector(selectNextUrl);
   const dispatch = useAppDispatch();

   return (
      <div className="users">
         <div className="container">
            <section className="users__section">
               <header className="users__header">
                  <h1 className="users__title heading1">Our cheerful users</h1>
                  <p className="users__attention">
                     Attention! Sorting users by registration date
                  </p>
               </header>

               <div className="users__grid">
                  <div className="users__row">
                     { users.map(user => (<User key={user.id} user={user}/>))}
                  </div>
               </div>

               <footer className="users__footer">
                  {next_url && (<button
                     className="users__link btn"
                     aria-label="Show more"
                     onClick={() => dispatch(addUsersAsync(next_url))}
                  >
                     Show more
                  </button>)}
               </footer>
            </section>
         </div>
      </div>
   );
}


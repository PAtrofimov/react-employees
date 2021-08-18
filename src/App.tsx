import React from 'react';
import Acquaintance from './features/acquaintance/Acquaintance';
import Assignment from './features/assignment/Assignment';
import Footer from './features/footer/Footer';
import Header from './features/header/Header';
import Registration from './features/registration/Registration';
import Users from './features/users/Users';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Assignment />
      <Acquaintance />
      <Users />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;

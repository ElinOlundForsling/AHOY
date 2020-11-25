import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProfilePage from './pages/ProfilePage';
import SignIn from './components/auth/SignIn';
import Signup from './components/auth/Signup';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/:userId' component={ProfilePage} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

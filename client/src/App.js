import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Profile from './pages/Profile';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/profiles/:userId' component={Profile} />
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

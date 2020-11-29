import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Pong from './pages/Pong';
import AdminPanel from './pages/AdminPanel';
import './stylesheets/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/profiles/:userId' component={Profile} />
          <Route path='/chat' component={Chat} />
          <Route path='/pong' component={Pong} />
          <Route path='/signup' component={Signup} />
          <Route path='/admin' component={AdminPanel} />
          <Route path='/signin' component={Signin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

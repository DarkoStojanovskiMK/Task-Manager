import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Error from './pages/Error';
import EditTask from './pages/EditTask';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AppProvider } from './context/context';
import AuthProvider from './context/authContext';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './routing/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router >
          <Fragment>
            <Navbar/>
            <div className="container">
              <Switch>
                <PrivateRoute exact path='/' component={Home}/>
                <Route exact path='/api/tasks/:id' component={EditTask}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <Route path='*' component={Error}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AppProvider>
    </AuthProvider>
    
  );
}

export default App;

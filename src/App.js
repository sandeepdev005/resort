import React from 'react';
import './App.css';

import {Route,Switch} from 'react-router-dom';

import Rooms from './pages/Rooms';
import Home from './pages/Home';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import NavBar from './components/NavBar';



function App() {
  return (
    <>
    <NavBar />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/rooms" component={Rooms} />
    <Route exact path="/singleroom" component={SingleRoom}/>
    <Route exact path="/room/:slug" component={SingleRoom} />
    <Error/>
    </Switch>
   
    </>
  );
}

export default App;

import React, { Fragment } from 'react';
import './assets/global_css/App.css';
import Navbar from './components/Layout/Navbar';

import { Switch, Route } from 'react-router-dom';

import Home from './components/Pages/Home';
import About from './components/Pages/About';

function App() {
  return (
      <Fragment>
        <Navbar />

        {/* Route starts here */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
      </Fragment>
  );
}

export default App;

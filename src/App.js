import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Pages/Dashboard';
import WatchLater from './components/Pages/WatchLater';
import Player from './components/Pages/Player';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path='/watchlater' component={WatchLater}></Route>
            <Route path='/player' component={Player}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

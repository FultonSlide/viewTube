import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Layout/Header';
import MobileHeader from './components/Layout/MobileHeader';
import Dashboard from './components/Pages/Dashboard';
import WatchLater from './components/Pages/WatchLater';
import Player from './components/Pages/Player';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <MobileHeader/>
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

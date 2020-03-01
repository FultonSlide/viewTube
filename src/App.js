import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Layout/Header';
import MobileHeader from './components/Layout/MobileHeader';
import Dashboard from './components/Pages/Dashboard';
import WatchLater from './components/Pages/WatchLater';
import Player from './components/Pages/Player';

//Key 1: AIzaSyAqSKoR84MGTlCJ_-YtywCQEucYj-747L4
//Key 2: AIzaSyCnF4i9AoHmwEcLFkVXq95B16mv53kT5p4
//Key 3: AIzaSyC0EQvDgWmnQQbZS_E08Wkcg-E00f5hSeI

class App extends Component {
  state = {
    apiKey: 'AIzaSyC0EQvDgWmnQQbZS_E08Wkcg-E00f5hSeI',
    URI: 'https://www.googleapis.com/youtube/v3',
    title: '',
    countryCode: '',
    musicTopicID: 'music',
    gamingTopicID: 'gaming',
    sportsTopicID: 'sports',
    dataLoaded: false,
    videoData: []
  }

  componentDidMount() {
    fetch('https://extreme-ip-lookup.com/json/')
      .then( res => res.json())
      .then(response => {
        console.log("Country: ", response);
        this.setState({
          ...this.state,
          countryCode: response.countryCode
        });
        this.handleTopVideosFetch();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          dataLoaded: false
        });
      });
  }

  handleTopVideosFetch = () => {
    this.setState({
      ...this.state,
      videoData: [],
      dataLoaded: false
    });

    fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&chart=mostPopular&maxResults=20`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          ...this.state,
          title: 'Top Videos',
          dataLoaded: true,
          videoData: data.items
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          dataLoaded: false
        });
      });
  }
  
  handleFetch = (q) => {
    this.setState({
      ...this.state,
      videoData: [],
      dataLoaded: false
    });

    fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&maxResults=30&q=${q}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...this.state,
          dataLoaded: true,
          videoData: data.items
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          dataLoaded: false
        });
      });
  }

  handleFetchTopics = (title) => {
    if(title === 'Music') {
      this.handleFetch(this.state.musicTopicID);
    } else if(title === 'Gaming'){
      this.handleFetch(this.state.gamingTopicID);
    } else if(title === 'Sports'){
      this.handleFetch(this.state.sportsTopicID);
    }
  }

  handleTitleState = (title) => {
    if(title === 'Music' || title === 'Gaming' || title === 'Sports' || title === 'Top Videos'){
      this.setState({
        title
      });
    }
  }

  addToStorage = (id) => {
    let savedVideoCount = localStorage.length;
    localStorage.setItem(savedVideoCount++, id);
  }

  removeFromStorage = (id) => {
    for(let i=0; i < localStorage.length; i++){
      if(id === localStorage.getItem([i])){
        localStorage.removeItem([i]);
      }
    }
  }

  search = (query) => {
    this.handleFetch(query);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header search={this.search} handleTopVideosFetch={this.handleTopVideosFetch}/>
          <MobileHeader handleTopVideosFetch={this.handleTopVideosFetch} search={this.search}/>
          <Switch>
            <Route exact path="/" render={(routeProps) => <Dashboard 
              {...routeProps} 
              apiKey={this.state.apiKey}
              URI={this.state.URI}
              videoData={this.state.videoData}
              dataLoaded={this.state.dataLoaded}
              title={this.state.title}
              addToStorage={this.addToStorage}
              removeFromStorage={this.removeFromStorage}
              handleFetch={this.handleFetch}
              handleTitleState={this.handleTitleState}
              handleFetchTopics={this.handleFetchTopics}
            />}></Route>

            <Route path='/watchlater' render={(routeProps) => <WatchLater
              {...routeProps}
              apiKey={this.state.apiKey}
              URI={this.state.URI}
              addToStorage={this.addToStorage}
              removeFromStorage={this.removeFromStorage}
            />}></Route>

            <Route path='/player/:id' render={(routeProps) => <Player
              {...routeProps} 
              apiKey={this.state.apiKey}
              URI={this.state.URI}
              addToStorage={this.addToStorage}
              removeFromStorage={this.removeFromStorage}
            />}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

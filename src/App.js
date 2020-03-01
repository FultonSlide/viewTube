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
//key 4: AIzaSyA1EkBEFgV4LT9-ERNZpTp7yYEVYB3eyag

class App extends Component {
  state = {
    apiKey: 'AIzaSyA1EkBEFgV4LT9-ERNZpTp7yYEVYB3eyag',
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

    fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&chart=mostPopular&maxResults=32`)
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
    localStorage.setItem(id, id);
  }

  removeFromStorage = (id) => {
    for(let i=0; i < localStorage.length; i++){
      console.log(localStorage.getItem(localStorage.key(i)));
      if(id === localStorage.getItem(localStorage.key(i)) || localStorage.getItem(localStorage.key(i)) == null){
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }

  search = (query) => {
    this.handleFetch(query);
  }

  decodeHTML = (html) => {
    let text = document.createElement('textarea');
    text.innerHTML = html;
    return text.value;
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
              decodeHTML={this.decodeHTML}
            />}></Route>

            <Route path='/watchlater' render={(routeProps) => <WatchLater
              {...routeProps}
              apiKey={this.state.apiKey}
              URI={this.state.URI}
              addToStorage={this.addToStorage}
              removeFromStorage={this.removeFromStorage}
              decodeHTML={this.decodeHTML}
            />}></Route>

            <Route path='/player/:id' render={(routeProps) => <Player
              {...routeProps} 
              apiKey={this.state.apiKey}
              URI={this.state.URI}
              addToStorage={this.addToStorage}
              removeFromStorage={this.removeFromStorage}
              decodeHTML={this.decodeHTML}
            />}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

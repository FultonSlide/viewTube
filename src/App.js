import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorageContextProvider from './contexts/StorageContext';
import Header from './components/Layout/Header';
import MobileHeader from './components/Layout/MobileHeader';
import Dashboard from './components/Pages/Dashboard';
import WatchLater from './components/Pages/WatchLater';
import Player from './components/Pages/Player';
import Spinner from './assets/svgs/Spinner.svg';

class App extends Component {
  state = {
    apiKey: process.env.REACT_APP_API_KEY,
    URI: 'https://www.googleapis.com/youtube/v3',
    initialLoad: true,
    title: '',
    countryCode: '',
    musicTopicID: 'music',
    gamingTopicID: 'gaming',
    sportsTopicID: 'sports',
    dataLoaded: false,
    videoData: [],
    nextPageToken: '',
    prevPageToken: '',
    query: '',
    navDetail: '',
    navTo: '',
    error: false,
    errorMsg: 'Daily Youtube API video limit exceeded, check back again later!'
  }

  componentDidMount() {
		if(this.state.initialLoad){
      this.handleTopVideosFetch();
      this.setState({
        initialLoad: false
      });
		}
  }

  handleTopVideosFetch = () => {
    fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&type=video&chart=mostPopular&maxResults=32`)
      .then(response => response.json())
      .then(data => {
        if(data.error){
          this.setState({
            error: true
          })
        } else {
          this.setState({
            title: 'Popular Videos',
            dataLoaded: true,
            videoData: data.items,
            nextPageToken: data.nextPageToken,
            prevPageToken: data.prevPageToken,
            query: '',
            error: false
          });
        }
      })
      .catch(err => {
        this.setState({
          dataLoaded: false
        });
      });
  }
  
  handleFetch = (q, title) => {
    fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&type=video&maxResults=32&q=${q}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          title,
          dataLoaded: true,
          nextPageToken: data.nextPageToken,
          prevPageToken: data.prevPageToken,
          query: q,
          videoData: data.items
        })
      })
      .catch(err => {
        this.setState({
          dataLoaded: false
        });
      });
  }

  handleChangePage = (pageToken) => {
    this.setState({
      dataLoaded: false,
      videoData: []
    });
    if(this.state.query) {
      fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&type=video&maxResults=32&q=${this.state.query}&pageToken=${pageToken}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataLoaded: true,
          nextPageToken: data.nextPageToken,
          prevPageToken: data.prevPageToken,
          videoData: data.items
        })
      })
      .catch(err => {
        this.setState({
          dataLoaded: false
        });
      });
    } else {
      fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&type=video&maxResults=32&pageToken=${pageToken}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataLoaded: true,
          nextPageToken: data.nextPageToken,
          prevPageToken: data.prevPageToken,
          videoData: data.items
        })
      })
      .catch(err => {
        this.setState({
          dataLoaded: false
        });
      });
    }
  }

  handleFetchTopics = (title) => {
    this.setState({
      dataLoaded: false,
      videoData: []
    });
    let newTitle = this.handleTitleState(title);
    if(title === 'Music') {
      this.handleFetch(this.state.musicTopicID, newTitle);
    } else if(title === 'Gaming'){
      this.handleFetch(this.state.gamingTopicID, newTitle);
    } else if(title === 'Sports'){
      this.handleFetch(this.state.sportsTopicID, newTitle);
    }
  }

  handleTitleState = (title) => {
    if(title === 'Music' || title === 'Gaming' || title === 'Sports' || title === 'Popular Videos' || title === 'Search'){
      return title;
    }
  }


  //StorageContext//
  addToStorage = (id) => {
    localStorage.setItem(id, id);
  }


  //StorageContext//
  removeFromStorage = (id) => {
    for(let i=0; i < localStorage.length; i++){
      if(id === localStorage.getItem(localStorage.key(i)) || localStorage.getItem(localStorage.key(i)) == null){
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }

  search = (query) => {
    this.setState({
      dataLoaded: false,
      videoData: []
    });
    this.handleFetch(query, 'Search');
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
          <StorageContextProvider apiKey={this.state.apiKey} URI={this.state.URI}>
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
                handleFetchTopics={this.handleFetchTopics}
                decodeHTML={this.decodeHTML}
                error={this.state.error}
                errorMsg={this.state.errorMsg}
                spinner={Spinner}
                handleChangePage={this.handleChangePage}
                nextPageToken={this.state.nextPageToken}
                prevPageToken={this.state.prevPageToken}
              />}></Route>

              <Route path='/watchlater' render={(routeProps) => <WatchLater
                {...routeProps}
                apiKey={this.state.apiKey}
                URI={this.state.URI}
                addToStorage={this.addToStorage}
                removeFromStorage={this.removeFromStorage}
                decodeHTML={this.decodeHTML}
                spinner={Spinner}
              />}></Route>

              <Route path='/player/:id' render={(routeProps) => <Player
                {...routeProps} 
                apiKey={this.state.apiKey}
                URI={this.state.URI}
                addToStorage={this.addToStorage}
                removeFromStorage={this.removeFromStorage}
                decodeHTML={this.decodeHTML}
                error={this.state.errorMsg}
                spinner={Spinner}
              />}></Route>
            </Switch>
          </StorageContextProvider>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

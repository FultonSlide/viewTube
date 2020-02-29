import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import SearchOptions from '../Atoms/SearchOptions';
import './DashboardStyles/DashboardStyles.css';

//Old key, quota reached: AIzaSyAqSKoR84MGTlCJ_-YtywCQEucYj-747L4
//Key 2: AIzaSyCnF4i9AoHmwEcLFkVXq95B16mv53kT5p4

class Dashboard extends Component {
    state = {
        title: '',
        countryCode: '',
        apiKey: 'AIzaSyCnF4i9AoHmwEcLFkVXq95B16mv53kT5p4',
        URI: 'https://www.googleapis.com/youtube/v3',
        musicTopicID: 'music',
        gamingTopicID: 'gaming',
        sportsTopicID: 'sports',
        videoData: []
    }

    handleFetch = (id) => {
        fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&maxResults=20&q=${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    videoData: data.items
                })
            })
            .catch(err => console.log(err));
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
                    fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&chart=mostPopular&maxResults=20&regionCode=${this.state.countryCode}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.setState({
                                ...this.state,
                                title: 'Top Videos',
                                videoData: data.items
                            })
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
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

    render () {
        return (
            <div className="Dashboard">
                <div className="Dashboard__search-options">
                    <h1>{this.state.title}</h1>
                    <SearchOptions handleTitleState={this.handleTitleState} handleFetchTopics={this.handleFetchTopics}/>
                </div>
                <div className="Dashboard__video-cards">
                    {this.state.videoData.length > 0 ? <VideoCardList videoData={this.state.videoData} addToStorage={this.addToStorage}/> : null}
                </div>
            </div>
        )
    }
}

export default Dashboard;
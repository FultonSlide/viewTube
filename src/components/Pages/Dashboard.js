import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import SearchOptions from '../Atoms/SearchOptions';
import './DashboardStyles/DashboardStyles.css';

class Dashboard extends Component {
    state = {
        title: 'Top Videos',
        apiKey: 'AIzaSyAqSKoR84MGTlCJ_-YtywCQEucYj-747L4',
        URI: 'https://www.googleapis.com/youtube/v3',
        musicTopicID: '/m/04rlf',
        gamingTopicID: '/m/0bzvm2',
        sportsTopicID: '/m/0jm_',
        videoData: []
    }

    componentDidMount() {
        fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&maxResults=20&topicID=${this.state.musicTopicID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    ...this.state,
                    videoData: data.items
                })
            })
            .catch(err => console.log(err));
    }

    handleFetchTopics = (title) => {
        if(title == 'Music') {
            fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&maxResults=20&topicID=${this.state.musicTopicID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    ...this.state,
                    videoData: data.items
                })
            })
            .catch(err => console.log(err));
        } else if(title == 'Gaming'){
            fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&maxResults=20&topicID=${this.state.gamingTopicID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    ...this.state,
                    videoData: data.items
                })
            })
            .catch(err => console.log(err));
        } else if(title == 'Sports'){
            fetch(`${this.state.URI}/search?key=${this.state.apiKey}&part=snippet&maxResults=20&topicID=${this.state.sportsTopicID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    ...this.state,
                    videoData: data.items
                })
            })
            .catch(err => console.log(err));
        }
    }

    handleTitleState = (title) => {
        if(title == 'Music' || title == 'Gaming' || title == 'Sports' || title == 'Top Videos'){
            this.setState({
                title
            });
        }
    }

    render () {
        return (
            <div className="Dashboard">
                <div className="Dashboard__search-options">
                    <h1>{this.state.title}</h1>
                    <SearchOptions handleTitleState={this.handleTitleState} handleFetchTopics={this.handleFetchTopics}/>
                </div>
                <div className="Dashboard__video-cards">
                    <VideoCardList videoData={this.state.videoData}/>
                </div>
            </div>
        )
    }
}

export default Dashboard;
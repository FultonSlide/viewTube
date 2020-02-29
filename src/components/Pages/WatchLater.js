import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import './WatchLaterStyles/WatchLaterStyles.css';

class WatchLater extends Component {
    state = {
        videoIds: [],
        videoData: [],
        apiKey: 'AIzaSyCnF4i9AoHmwEcLFkVXq95B16mv53kT5p4',
        URI: 'https://www.googleapis.com/youtube/v3',
    }

    getLocalStorage = () => {
        for(let i=0; i < localStorage.length; i++){
            this.state.videoIds.push(localStorage.getItem([i]));
        }
    }

    handleFetch = (id) => {
        fetch(`${this.state.URI}/search?part=snippet&id=${id}&key=${this.state.apiKey}`)
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
        let query = '';
        this.getLocalStorage();
        for(let i=0; i < this.state.videoIds.length; i++){
            query += `${this.state.videoIds[i]},`
        }
        console.log(query);
        if(query){
            this.handleFetch(query);
        }
    }

    render () {

        return (
            <div className="WatchLater">
                <div className="WatchLater__title">
                    <h1>Watch Later Playlist</h1>
                </div>

                <div className="WatchLater__video-cards">
                    {this.state.videoData.length > 0 ? <VideoCardList videoData={this.state.videoData}/> : null}
                </div>
            </div>
        )
    }
}

export default WatchLater;
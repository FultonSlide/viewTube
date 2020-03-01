import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import './WatchLaterStyles/WatchLaterStyles.css';

class WatchLater extends Component {
    state = {
        videoIds: [],
        videoData: [],
        dataLoaded: false
    }

    getLocalStorage = () => {
        for(let i=localStorage.length-1; i >= 0; i--){
            this.state.videoIds.push(localStorage.getItem([i]));
        }
    }

    handleFetch = (id) => {
        fetch(`${this.props.URI}/videos?part=snippet&id=${id}&key=${this.props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
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
        let render = this.state.dataLoaded ? (
            <div className="WatchLater">
                <div className="WatchLater__title">
                    <h1>Watch Later Playlist</h1>
                </div>

                <div className="WatchLater__video-cards">
                    {this.state.videoData.length > 0 ? <VideoCardList videoData={this.state.videoData} addToStorage={this.props.addToStorage} removeFromStorage={this.props.removeFromStorage}/> : null}
                </div>
            </div>
        ) : (
            <div>Data Not Loaded</div>
        );
        return (
            <div>{render}</div>
        )
    }
}

export default WatchLater;
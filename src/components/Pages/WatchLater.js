import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import './WatchLaterStyles/WatchLaterStyles.css';

class WatchLater extends Component {
    render () {
        return (
            <div className="WatchLater">
                <div className="WatchLater__title">
                    <h1>Watch Later Playlist</h1>
                </div>

                <div className="WatchLater__video-cards">
                    <VideoCardList/>
                </div>
            </div>
        )
    }
}

export default WatchLater;
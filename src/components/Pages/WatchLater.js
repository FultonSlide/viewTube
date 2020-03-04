import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import { StorageContext } from '../../contexts/StorageContext';
import './WatchLaterStyles/WatchLaterStyles.css';

class WatchLater extends Component {
    state = {
        errorMsg: 'Daily Youtube API video limit exceeded, check back again later!'
    }

    static contextType = StorageContext;

    componentDidMount() {
        if(this.context.videoIds.length === 0 || this.context.videoIds.length !== localStorage.length){
            console.log(this.context.videoData);
            let query = '';
            this.context.getLocalStorage()
                .then(() => {
                    for(let i=0; i < this.context.videoIds.length; i++){
                        query += `${this.context.videoIds[i]},`
                    }
                    if(query){
                        this.context.handleVideoIdFetch(query);
                    }
                }).catch(err => console.log(err));
        }
    }

    render () {
        let render;
        if(!this.context.error){
            if(localStorage.length !== 0){
                if(this.context.videoDataLoaded){
                    render = <div className="WatchLater">
                            <div className="WatchLater__title">
                                <h1>Watch Later Playlist</h1>
                            </div>
    
                            <div className="WatchLater__video-cards">
                                {this.context.videoData.length > 0 ? <VideoCardList 
                                    videoData={this.context.videoData} 
                                    addToStorage={this.context.addToStorage} 
                                    removeFromStorage={this.context.removeFromStorage}
                                    decodeHTML={this.props.decodeHTML}
                                    updateList={this.context.updateList}
                                /> : <div className="WatchLater__error">Error, oops something went wrong</div>}
                            </div>
                        </div>;
                } else {
                    render = <div className="WatchLater__loading"><img src={this.props.spinner} alt="loading" className="Player__spinner"/></div>;
                }
            } else {
                render = <div className="WatchLater__noVideos">No videos in your playlist</div>;
            }
        } else {
            render = <div className="WatchLater__error">{this.state.errorMsg}</div>;
        }

        return (
            <div>{render}</div>
        )
    }
}

export default WatchLater;
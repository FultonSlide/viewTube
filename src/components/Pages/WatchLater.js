import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import './WatchLaterStyles/WatchLaterStyles.css';

class WatchLater extends Component {
    state = {
        videoIds: [],
        videoData: [],
        dataLoaded: false
    }

    componentDidMount() {
        if(this.state.videoIds.length === 0){
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
    }

    getLocalStorage = () => {
        for(let i=localStorage.length-1; i >= 0; i--){
            this.state.videoIds.push(localStorage.getItem(localStorage.key(i)));
        }
    }

    updateList = (id) => {
        let videoIds = this.state.videoIds.filter((videoId) => {
            return id !== videoId;
        });

        let query = '';
        for(let i=0; i < videoIds.length; i++){
            query += `${videoIds[i]},`
        }
        console.log(query);
        if(query){
            this.handleFetch(query);
        }
        this.setState({
            ...this.state,
            videoIds: videoIds
        })
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

    render () {
        let render;
        if(localStorage.length !== 0){
            if(this.state.dataLoaded){
                render = <div className="WatchLater">
                        <div className="WatchLater__title">
                            <h1>Watch Later Playlist</h1>
                        </div>

                        <div className="WatchLater__video-cards">
                            {this.state.videoData.length > 0 ? <VideoCardList 
                                videoData={this.state.videoData} 
                                addToStorage={this.props.addToStorage} 
                                removeFromStorage={this.props.removeFromStorage}
                                decodeHTML={this.props.decodeHTML}
                                updateList={this.updateList}
                            /> : <div className="WatchLater__error">Error, please refresh the application</div>}
                        </div>
                    </div>;
            } else {
                render = <div className="WatchLater__loading">Loading</div>
            }
        } else {
            render = <div className="WatchLater__noVideos">No videos in your playlist</div>;
        }

        return (
            <div>{render}</div>
        )
    }
}

export default WatchLater;
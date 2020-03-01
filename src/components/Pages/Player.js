import React, { Component } from 'react';
import moment from 'moment';
import VideoCardList from '../Layout/VideoCardList';
import './PlayerStyles/PlayerStyles.css';

class Player extends Component {
    state = {
        dataLoaded: false,
        relatedDataLoaded: false,
        descActive: false,
        videoDetails: [],
        relatedVideos: []
    }

    componentDidMount() {
        this.handleFetch(this.props.match.params.id);
        this.handleRelatedVideoFetch(this.props.match.params.id);
    }

    handleRelatedVideoFetch = (id) => {
        console.log('handleRVF');
        fetch(`${this.props.URI}/search?part=snippet&maxResults=21&type=video&relatedToVideoId=${id}&key=${this.props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    ...this.state,
                    relatedVideos: data.items,
                    relatedDataLoaded: true
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    relatedDataLoaded: false
                });
            });
    }

    handleFetch = (id) => {
        fetch(`${this.props.URI}/videos?part=snippet&id=${id}&key=${this.props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    ...this.state,
                    videoDetails: data.items[0],
                    dataLoaded: true
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

    handleDescActive = () => {
        this.setState({
            ...this.state,
            descActive: !this.state.descActive
        })
    }

    render () {
        let URL = 'https://www.youtube.com/embed/';
        let videoId = this.props.match.params.id;
        let render = this.state.dataLoaded && this.state.relatedDataLoaded ? (
            <div className="Player">
                <div className="Player__video">
                    <iframe src={URL + videoId + '?autoplay=1' } frameBorder="0" title="embed video" align="middle" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
                <div className="Player__details">
                    <h1 className="Player__title">{this.state.videoDetails.snippet.title}</h1>
                    <p className={this.state.descActive ? "Player__desc Player__desc--active" : "Player__desc"} onClick={this.handleDescActive}>{this.state.videoDetails.snippet.description}</p>
                    <p className="Player__channelName">{this.state.videoDetails.snippet.channelTitle}</p>
                    <p className="Player__publishedAt">{ moment(this.state.videoDetails.snippet.publishedAt).fromNow() }</p>
                    <p className="Player__add"></p>
                </div>
                <div className="Player__relatedVideos">
                    <h1>Related Videos</h1>
                    {this.state.relatedVideos.length > 0 ? <VideoCardList 
                        videoData={this.state.relatedVideos} 
                        addToStorage={this.props.addToStorage} 
                        removeFromStorage={this.props.removeFromStorage}
                        handleRelatedVideoFetch={this.handleRelatedVideoFetch}
                        handleFetch={this.handleFetch}
                        decodeHTML={this.props.decodeHTML}
                    /> : <div className="Player__relVidError">No Videos Found</div>}
                </div>
            </div>
        ) : (
            <div className="Player__loading">Loading</div>
        );
        return (
            <div>{render}</div>
        )
    }
}

export default Player;
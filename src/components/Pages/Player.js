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
        relatedVideos: [],
        error: false,
        errorMsg: ''
    }

    componentDidMount() {
        this.handleFetch(this.props.match.params.id);
        this.handleRelatedVideoFetch(this.props.match.params.id);
        this.setState({
            ...this.state,
            errorMsg: this.props.error
        });
    }

    handleRelatedVideoFetch = (id) => {
        fetch(`${this.props.URI}/search?part=snippet&maxResults=21&type=video&relatedToVideoId=${id}&key=${this.props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.setState({
                        ...this.state,
                        error: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        relatedVideos: data.items,
                        relatedDataLoaded: true,
                        error: false
                    })
                }
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    relatedDataLoaded: false,
                    error: true,
                    errorMsg: 'Network error'
                });
            });
    }

    handleFetch = (id) => {
        fetch(`${this.props.URI}/videos?part=snippet&id=${id}&key=${this.props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.setState({
                        ...this.state,
                        error: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        videoDetails: data.items[0],
                        dataLoaded: true
                    });
                }
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    dataLoaded: false,
                    error: true,
                    errorMsg: 'Network error'
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
        let render;
        if(!this.state.error){
            render = this.state.dataLoaded && this.state.relatedDataLoaded ? (
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
        } else {
            render = <div className="Player__error">{this.state.errorMsg}</div>;
        }
        return (
            <div>{render}</div>
        )
    }
}

export default Player;
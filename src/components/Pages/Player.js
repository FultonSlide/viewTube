import React, { Component } from 'react';
import moment from 'moment';
import VideoCardList from '../Layout/VideoCardList';
import Add from '../../assets/svgs/Add.svg';
import { StorageContext} from '../../contexts/StorageContext';
import './PlayerStyles/PlayerStyles.css';

class Player extends Component {
    state = {
        dataLoaded: false,
        relatedDataLoaded: false,
        descActive: false,
        inStorage: false,
        videoDetails: [],
        relatedVideos: [],
        error: false,
        errorMsg: '',
        id: this.props.match.params.id
    }

    static contextType = StorageContext;

    componentDidMount() {
        this.handleFetch(this.state.id);
        this.handleRelatedVideoFetch(this.state.id);
        this.setState({
            errorMsg: this.props.error,
            inStorage: this.checkInStorage(this.state.id)
        });
    }

    handleRelatedVideoFetch = (id) => {
        fetch(`${this.props.URI}/search?part=snippet&maxResults=21&type=video&relatedToVideoId=${id}&key=${this.props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.setState({
                        error: true
                    })
                } else {
                    this.setState({
                        relatedVideos: data.items,
                        relatedDataLoaded: true,
                        error: false
                    })
                }
            })
            .catch(err => {
                this.setState({
                    relatedDataLoaded: false,
                    error: true,
                    errorMsg: 'Network error'
                });
            });
    }

    handleFetch = (id) => {
        fetch(`${this.props.URI}/videos?part=snippet&id=${id}&type=video&key=${this.props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.setState({
                        error: true,
                        id: id
                    })
                } else {
                    this.setState({
                        videoDetails: data.items[0],
                        dataLoaded: true,
                        id: id
                    });
                }
            })
            .catch(err => {
                this.setState({
                    dataLoaded: false,
                    error: true,
                    errorMsg: 'Network error',
                    id: id
                });
            });
    }

    handleDescActive = () => {
        this.setState({
            descActive: !this.state.descActive
        })
    }

    handleAddClick = () => {
        if(this.state.inStorage){
            this.context.removeFromStorage(this.state.id);
            this.setState({
                inStorage: false
            });
            this.context.updateList(this.state.id);
        } else {
            this.context.addToStorage(this.state.id);
            this.setState({
                inStorage: true
            });
        }
    }

    checkInStorage = (videoId) => {
        let inStorage = false; 
        for(let i=0; i < localStorage.length; i++){
            if(videoId === localStorage.getItem(localStorage.key(i))){
                inStorage = true;
                break;
            }
        }

        return inStorage;
    }

    render () {
        let URL = 'https://www.youtube.com/embed/';
        let tooltipText = this.state.inStorage ? 'Remove from Watch Later Playlist' : 'Add to Watch Later Playlist';
        let render;
        if(!this.state.error){
            render = this.state.dataLoaded && this.state.relatedDataLoaded ? (
                <div className="Player">
                    <div className="Player__video">
                        <iframe src={URL + this.state.id + '?autoplay=1' } frameBorder="0" title="embed video" align="middle" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                    <div className="Player__details">
                        <h1 className="Player__title">{this.state.videoDetails.snippet.title}</h1>
                        <p className={this.state.descActive ? "Player__desc Player__desc--active" : "Player__desc"} onClick={this.handleDescActive}>{this.state.videoDetails.snippet.description}</p>
                        <p className="Player__channelName">{this.state.videoDetails.snippet.channelTitle}</p>
                        <p className="Player__publishedAt">{ moment(this.state.videoDetails.snippet.publishedAt).fromNow() }</p>
                        {this.state.inStorage ? <img src={Add} alt="add" className="Player__add Player__add--active" onClick={this.handleAddClick}/> : <img src={Add} alt="add" className="Player__add" onClick={this.handleAddClick}/>}
                        <div className="Player__tooltip">{tooltipText}</div>
                    </div>
                    <div className="Player__relatedVideos">
                        <h1>Related Videos</h1>
                        {this.state.relatedVideos.length > 0 ? <VideoCardList 
                            videoData={this.state.relatedVideos} 
                            addToStorage={this.context.addToStorage} 
                            removeFromStorage={this.context.removeFromStorage}
                            handleRelatedVideoFetch={this.handleRelatedVideoFetch}
                            handleFetch={this.handleFetch}
                            decodeHTML={this.props.decodeHTML}
                        /> : <div className="Player__relVidError">No Videos Found</div>}
                    </div>
                </div>
            ) : (
                <div className="Player__loading"><img src={this.props.spinner} alt="loading" className="Player__spinner"/></div>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Add from '../../assets/svgs/Add.svg';
import './VideoCardStyles/VideoCardStyles.css';

class VideoCard extends Component {
    state = {
        inStorage: false,
        id: this.props.videoData.id.videoId ? this.props.videoData.id.videoId : this.props.videoData.id
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            inStorage: this.checkInStorage(this.state.id)
        });
    }

    handleLinkClick = () => {
        if(this.props.handleFetch && this.props.handleRelatedVideosFetch){
            this.props.handleFetch(this.state.id);
            this.props.handleRelatedVideosFetch(this.state.id);
        }
    }

    handleClick = (e) => {
        if(this.state.inStorage){
            this.props.removeFromStorage(this.state.id);
            this.setState({
                ...this.state,
                inStorage: false
            });
        } else {
            this.props.addToStorage(this.state.id);
            this.setState({
                ...this.state,
                inStorage: true
            });
        }
    }

    checkInStorage = (videoId) => {
        let inStorage = false; 
        for(let i=0; i < localStorage.length; i++){
            if(videoId === localStorage.getItem([i])){
                inStorage = true;
                break;
            }
        }

        return inStorage;
    } 

    render () {
        return (
            <div className="VideoCard">
                <Link to={'/player/' + this.state.id} className="VideoCard__content" onClick={this.handleLinkClick}>
                    <img src={this.props.videoData.snippet.thumbnails.high.url} alt="thumbnail" className="VideoCard__thumbnail"/>
                    <h2 className="VideoCard__cardTitle">{this.props.videoData.snippet.title}</h2>
                </Link>
                <div className="VideoCard__info">
                    <p className="VideoCard__channelTitle">{this.props.videoData.snippet.channelTitle}</p>
                    <p className="VideoCard__publishedAt">{ moment(this.props.videoData.snippet.publishedAt).fromNow() }</p>
                    {this.state.inStorage ? <img src={Add} alt="add" className="VideoCard__add VideoCard__add--active" onClick={this.handleClick}/> : <img src={Add} alt="add" className="VideoCard__add" onClick={this.handleClick}/>}
                </div>
            </div>
        )
    }
};

export default VideoCard;
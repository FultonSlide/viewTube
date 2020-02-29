import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Add from '../../assets/svgs/Add.svg';
import './VideoCardStyles/VideoCardStyles.css';

class VideoCard extends Component {

    handleClick = (e) => {
        console.log(this.props);
        this.props.addToStorage(this.props.videoData.id.videoId);
    }

    render () {
        return (
            <div className="VideoCard">
                <Link to={'/player/' + this.props.videoData.id.videoId} className="VideoCard__content">
                    <img src={this.props.videoData.snippet.thumbnails.high.url} alt="thumbnail" className="VideoCard__thumbnail"/>
                    <h2 className="VideoCard__cardTitle">{this.props.videoData.snippet.title}</h2>
                    <p className="VideoCard__desc">{this.props.videoData.snippet.description}</p>
                </Link>
                <div className="VideoCard__info">
                    <p className="VideoCard__channelTitle">{this.props.videoData.snippet.channelTitle}</p>
                    <p className="VideoCard__publishedAt">{ moment(this.props.videoData.snippet.publishedAt).fromNow() }</p>
                    <img src={Add} alt="add" className="VideoCard__add" onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
};

export default VideoCard;
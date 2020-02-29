import React from 'react';
import moment from 'moment';
import Add from '../../assets/svgs/Add.svg';
import './VideoCardStyles/VideoCardStyles.css';

const VideoCard = ({ videoData }) => {
    return (
        <div className="VideoCard">
            <img src={videoData.snippet.thumbnails.high.url} alt="thumbnail" className="VideoCard__thumbnail"/>
            <div className="VideoCard__content">
                <h2 className="VideoCard__cardTitle">{videoData.snippet.title}</h2>
                <p className="VideoCard__desc">{videoData.snippet.description}</p>
                <p className="VideoCard__channelTitle">{videoData.snippet.channelTitle}</p>
                <p className="VideoCard__publishedAt">{ moment(videoData.snippet.publishedAt).fromNow() }</p>
                <img src={Add} alt="add" className="VideoCard__add"/>
            </div>
        </div>
    )
};

export default VideoCard;
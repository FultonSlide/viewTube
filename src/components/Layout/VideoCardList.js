import React from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import './VideoCardListStyles/VideoCardListStyles.css';

const VideoCardList = (props) => {
    return (
        <div className="VideoCardList">
            {props.videoData.map((video) => {
                return (
                    <VideoCard videoData={video} key={video.id.videoId} addToStorage={props.addToStorage}/>
                )
            })}
        </div>
    )
};

export default VideoCardList;
import React from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import './VideoCardListStyles/VideoCardListStyles.css';

const VideoCardList = ({ videoData }) => {
    return (
        <div className="VideoCardList">
            {videoData.map((video) => {
                return (
                    <Link to={'/player/' + video.id.videoId}>
                        <VideoCard videoData={video} key={video.id.videoId}/>
                    </Link>
                )
            })}
        </div>
    )
};

export default VideoCardList;
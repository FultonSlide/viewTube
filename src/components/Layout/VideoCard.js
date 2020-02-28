import React from 'react';
import './VideoCardStyles/VideoCardStyles.css';

const VideoCard = (props) => {
    return (
        <div className="VideoCard">
            <h2>VideoCard Title</h2>
            <p>VideoCard User</p>
            <p>VideoCard Views</p>
            <p>VideoCard Posted</p>
        </div>
    )
};

export default VideoCard;
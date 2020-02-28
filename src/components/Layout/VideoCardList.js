import React from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import './VideoCardListStyles/VideoCardListStyles.css';

const VideoCardList = (props) => {
    return (
        <div className="VideoCardList">
            <Link to={'/player'}>
                <VideoCard/>
            </Link>
            <Link to={'/player'}>
                <VideoCard/>
            </Link>
            <Link to={'/player'}>
                <VideoCard/>
            </Link>
            <Link to={'/player'}>
                <VideoCard/>
            </Link>
            <Link to={'/player'}>
                <VideoCard/>
            </Link>
            <Link to={'/player'}>
                <VideoCard/>
            </Link>
            <Link to={'/player'}>
                <VideoCard/>
            </Link>
        </div>
    )
};

export default VideoCardList;
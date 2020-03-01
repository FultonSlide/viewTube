import React from 'react';
import { v4 as uuid } from 'uuid';
import VideoCard from './VideoCard';
import './VideoCardListStyles/VideoCardListStyles.css';

const VideoCardList = (props) => {
    return (
        <div className="VideoCardList">
            {props.videoData.map((video) => {
                return (
                    <VideoCard 
                        videoData={video} 
                        key={uuid()} 
                        addToStorage={props.addToStorage} 
                        removeFromStorage={props.removeFromStorage}
                        handleRelatedVideosFetch={props.handleRelatedVideoFetch}
                        handleFetch={props.handleFetch}
                        decodeHTML={props.decodeHTML}
                        updateList={props.updateList}
                    />
                )
            })}
        </div>
    )
};

export default VideoCardList;
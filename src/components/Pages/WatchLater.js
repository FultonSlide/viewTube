import React, { useState, useEffect, useContext } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import { StorageContext } from '../../contexts/StorageContext';
import './WatchLaterStyles/WatchLaterStyles.css';

const WatchLater = (props) => {
    const { error, videoIds, videoData, getLocalStorage, handleVideoIdFetch, videoDataLoaded, addToStorage, removeFromStorage, updateList } = useContext(StorageContext);
    const [ errorMsg ] = useState('Daily Youtube API video limit exceeded, check back again later!');
    const [ storageLength ] = useState(localStorage.length);

    useEffect(() => {
        let query = '';
            getLocalStorage()
                .then(() => {
                    for(let i=0; i < videoIds.length; i++){
                        query += `${videoIds[i]},`
                    }
                    if(query){
                        handleVideoIdFetch(query);
                    }
                }).catch(err => console.log(err));
    }, [videoIds.length]);

    const handleRender = () => {
        let render;
        if(!error){
            if(localStorage.length !== 0){
                if(videoDataLoaded){
                    render = <div className="WatchLater">
                            <div className="WatchLater__title">
                                <h1>Watch Later Playlist</h1>
                            </div>
    
                            <div className="WatchLater__video-cards">
                                {videoData.length > 0 ? <VideoCardList 
                                    videoData={videoData} 
                                    addToStorage={addToStorage} 
                                    removeFromStorage={removeFromStorage}
                                    decodeHTML={props.decodeHTML}
                                    updateList={updateList}
                                /> : <div className="WatchLater__error">Error, oops something went wrong</div>}
                            </div>
                        </div>;
                } else {
                    render = <div className="WatchLater__loading"><img src={props.spinner} alt="loading" className="Player__spinner"/></div>;
                }
            } else {
                render = <div className="WatchLater__noVideos">No videos in your playlist</div>;
            }
        } else {
            render = <div className="WatchLater__error">{errorMsg}</div>;
        }

        return render;
    }

    return (
        <div>{handleRender()}</div>
    )
}

export default WatchLater;
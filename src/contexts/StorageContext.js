import React, { createContext, useState } from 'react';

export const StorageContext = createContext();

const StorageContextProvider = (props) => {
    const [inStorage, setInStorage] = useState(false);
    const [videoDataLoaded, setVideoDataLoaded] = useState(false);
    const [error, setError] = useState('');
    const [videoData, setVideoData] = useState([]);
    const [videoIds, setVideoIds] = useState([]);

    const getLocalStorage = () => {
        return new Promise((resolve) => {
            let ids = [];
        
            for(let i=0; i < localStorage.length; i++){
                ids.push(localStorage.getItem(localStorage.key(i)));
            }

            setVideoIds([...ids]);

            resolve();
        });
    }

    const addToStorage = (id) => {
        localStorage.setItem(id, id);
    }

    const removeFromStorage = (id) => {
        for(let i=0; i < localStorage.length; i++){
            if(id === localStorage.getItem(localStorage.key(i)) || localStorage.getItem(localStorage.key(i)) == null){
                localStorage.removeItem(localStorage.key(i));
            }
        }
    }

    const updateList = (id) => {
        let tempVideoIds = videoIds.filter((videoId) => {
            return id !== videoId;
        });
        
        setVideoIds([...tempVideoIds]);
    }

    const handleVideoIdFetch = (id) => {
        fetch(`${props.URI}/videos?part=snippet&id=${id}&key=${props.apiKey}`)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    setError(true);
                } else {
                    setVideoData(data.items);
                    setVideoDataLoaded(true);
                    setError(false);
                }
            })
            .catch(err => {
                setVideoDataLoaded(false);
            });
    }

    const updateInStorage = (videoId) => {
        let isInStorage = false; 
        for(let i=0; i < localStorage.length; i++){
            if(videoId === localStorage.getItem(localStorage.key(i))){
                isInStorage = true;
                break;
            }
        }

        setInStorage(isInStorage);
    }

    return (
        <StorageContext.Provider value={{inStorage, videoDataLoaded, error, videoData, videoIds, setVideoDataLoaded, setError, setVideoData, setVideoIds, updateInStorage, removeFromStorage, addToStorage, getLocalStorage, updateList, handleVideoIdFetch}}>
            {props.children}
        </StorageContext.Provider>
    );
}

export default StorageContextProvider;
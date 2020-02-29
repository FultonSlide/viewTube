import React, { Component } from 'react';
import './PlayerStyles/PlayerStyles.css';

class Player extends Component {
    render () {
        let URL = 'https://www.youtube.com/embed/';
        let videoId = this.props.match.params.id;
        console.log(this.props.match.params.id);
        return (
            <div className="Player">
                <div className="Player__video">
                    <iframe src={URL + videoId + '?autoplay=1' } frameBorder="0" title="embed video" align="middle" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
            </div>
        )
    }
}

export default Player;
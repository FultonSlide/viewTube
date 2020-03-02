import React, { Component } from 'react';
import './LogoIconSVGStyles/LogoIconSVGStyles.css';

class LogoIconSVG extends Component {
    render(){
        return(
            <svg width="148" height="141" viewBox="0 0 148 141" fill="none" xmlns="http://www.w3.org/2000/svg" className="LogoIconSVG">
                <g id="IconGroup">
                    <g id="Eye-group">
                        <path d="M36.3367 96.9047C30.8344 88.8201 27.7519 79.4014 27.4636 69.7931C27.1754 60.1848 29.694 50.8007 34.7132 42.7809L77.2392 70.1001L36.3367 96.9047Z" id="Eye" fill="#8FBFE0"/>
                    </g>
                    <g id="BlueEyelid-group">
                        <rect y="112.823" id="BlueEyelid" width="100" height="12" rx="5.93634" transform="rotate(-29.8832 0 112.823)" fill="#0A4272"/>
                    </g>
                    <g id="RedEyelid-group">
                        <rect x="6.02118" id="RedEyelid" y="18.8233" width="100" height="12" rx="6" transform="rotate(30.1168 6.02118 18.8233)" fill="#DD0426"/>
                    </g>
                </g>
            </svg>
        )
    }
}

export default LogoIconSVG;
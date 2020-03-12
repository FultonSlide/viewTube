import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './LogoIconSVGStyles/LogoIconSVGStyles.css';

const LogoIconSVG = (props) => {
    const [ animate, setAnimate ] = useState(false);

    const handleClick = () => {
        setAnimate(!animate);
    }

    const directHome = (e) => {
        if(e.target.classList.value === "BlueEyelid active"){
            setAnimate(false);
            props.handleTopVideosFetch();
            props.history.push('/');
        }
    }

    return(
        <div className="LogoIconSVG">
            <svg width="148" height="141" viewBox="0 0 148 141" fill="none" xmlns="http://www.w3.org/2000/svg" className="LogoIconSVG__logo" onClick={handleClick} onAnimationEnd={directHome}>
                <g id="IconGroup">
                    
                    <g id="Eye-group">
                        <path d="M36.3367 96.9047C30.8344 88.8201 27.7519 79.4014 27.4636 69.7931C27.1754 60.1848 29.694 50.8007 34.7132 42.7809L77.2392 70.1001L36.3367 96.9047Z" id="Eye" fill="#8FBFE0"/>
                    </g>
                    <path d="M30.3367 90.9047C30.8344 90.8201 25.7519 75.4014 25.4636 63.7931C27.1754 60.1848 29.694 50.8007 34.7132 42.7809L77.2392 70.1001L36.3367 96.9047Z" className={animate ? "Upper-Eye Upper-Eye--active" : "Upper-Eye"} fill="white"/>
                    <path d="M36.3367 96.9047C30.8344 88.8201 27.7519 79.4014 27.4636 69.7931C27.1754 60.1848 29.694 50.8007 34.7132 42.7809L77.2392 70.1001L36.3367 96.9047Z" className={animate ? "Lower-Eye Lower-Eye--active" : "Lower-Eye"} fill="white"/>
                    <g id="BlueEyelid-group">
                        <rect y="112.823" className={animate ? "BlueEyelid active" : "BlueEyelid"} width="100" height="12" rx="5.93634" transform="rotate(-29.8832 0 112.823)" fill="#0A4272"/>
                    </g>
                    <g id="RedEyelid-group">
                        <rect x="6.02118" className={animate ? "RedEyelid active" : "RedEyelid"} y="18.8233" width="100" height="12" rx="6" transform="rotate(30.1168 6.02118 18.8233)" fill="#DD0426"/>
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default withRouter(LogoIconSVG);
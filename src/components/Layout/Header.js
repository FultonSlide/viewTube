import React from 'react';
import Navbar from './Navbar';
import ViewtubeLogo from '../../assets/logos/viewtubeLogo.svg';
import './HeaderStyles/HeaderStyles.css';

const Header = (props) => {
    return (
        <div className="Header">
            <img src={ViewtubeLogo} alt="viewTube" className="Header__logo"/>
            <Navbar/>
        </div>
    );
};

export default Header;
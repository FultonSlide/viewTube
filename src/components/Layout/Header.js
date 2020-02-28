import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ViewtubeLogo from '../../assets/logos/viewtubeLogo.svg';
import SearchBar from '../Atoms/SearchBar';
import './HeaderStyles/HeaderStyles.css';

const Header = (props) => {
    return (
        <div className="Header">
            <Link to={'/'} className="Header__link">
                <img src={ViewtubeLogo} alt="viewTube" className="Header__logo"/>
            </Link>
            <SearchBar/>
            <Navbar/>
        </div>
    );
};

export default Header;
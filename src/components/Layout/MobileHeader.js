import React from 'react';
import { Link } from 'react-router-dom';
import BurgerNav from './BurgerNav';
import MobileViewtubeLogo from '../../assets/logos/Icon.svg';
import MobileViewtubeTitle from '../../assets/logos/Title.svg';
import SearchBar from '../Atoms/SearchBar';
import './MobileHeaderStyles/MobileHeaderStyles.css';

const MobileHeader = (props) => {
    return (
        <div className="MobileHeader">
            <div className="MobileHeader__nav">
                <Link to={'/'} className="MobileHeader__link">
                    <img src={MobileViewtubeLogo} alt="viewTube" className="MobileHeader__logo"/>
                </Link>
                <img src={MobileViewtubeTitle} alt="viewTube" className="MobileHeader__title"/>
                <BurgerNav/>
            </div>
            <div className="MobileHeader__search">
                <SearchBar/>
            </div>
        </div>
    );
};

export default MobileHeader;